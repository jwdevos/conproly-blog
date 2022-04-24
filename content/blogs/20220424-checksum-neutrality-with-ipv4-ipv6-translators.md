---
date: 2022-04-23 00:00:00+00:00
title: Checksum Neutrality With IPv4/IPv6 Translators
url: /blogs/20220424-checksum-neutrality-with-ipv4-ipv6-translators/
page_id: _20220424_checksum_neutrality_with_ipv4_ipv6_translators
featured_image: /img/posts/20220424-checksum-neutrality-with-ipv4-ipv6-translators/ipv6-evolution.png
description: "In this post, I answer the following question: do you need to care about checksum neutrality with IPv4/IPv6 translation?"
tags:
- ipv4
- ipv6
- ipv4/ipv6
- nat
- network address translation
- nat64
- stateless translation
- checksum neutrality
- ip address
- ip addresses
- ip addressing
---

When translating IPv4 to IPv6, the IPv4 address of a given packet gets wrapped into a larger IPv6 address. This has consequences for the checksum in the header of the translated packet. In this post, I answer the following question: do you need to care about checksum neutrality with IPv4/IPv6 translation?
{{< blogimage "/img/posts/20220424-checksum-neutrality-with-ipv4-ipv6-translators/ipv6-evolution.png" >}}
<!--more-->
The awesome graphic was shamelessly stolen from [dougvitale.wordpress.com](https://dougvitale.wordpress.com/).

- Peer reviewed by bla

An IPv4 address consists of 32 bits, structured in 4 octetcs of 8 bits each. An IPv6 address consists of 128 bits, structured into 8 groups of 16 bits each. IPv4 addresses are typically written in a decimal format. IPv6 addresses are typically written in a hexadecimal format. Here is an example of each:

- IPv4 decimal: `192.168.1.101`
- IPv4 binary: `11000000.10101000.00000001.01100101`
- IPv6 hexadecimal: `64:ff9b:1:fffd:1::c0a8:165`
- IPv6 binary: `0000000001100100:1111111110011011:0000000000000001:1111111111111101:0000000000000001:0000000000000000:1100000010101000:0000000101100101`

In the hexadecimal IPv6 example above, short notation is used as explained [here](https://en.wikipedia.org/wiki/IPv6_address#Representation). The full version of the IPv6 address in the example is `0064:ff9b:0001:fffd:0001:0000:c0a8:0165`. Looking closer at the binary version of the IPv4 address (32 bits in total), and then at the last 32 bits of the binary IPv6 address, you can tell that those 32 bits are equal. So, in this example, the IPv6 address is wrapped into a larger IPv6 address.

In this way, a `/96` IPv6 prefix fits the entire IPv4 address space. The `/96` prefix leaves 32 bits free, for a total of the 128 bits that an IPv6 address contains. Within those 32 free bits, any possible IPv4 address can be represented.

Armed with the basic idea of how an IPv4 address fits in an IPv6 prefix, let's move on and examine what kind of IPv6 prefix might be used in practical IPv4/IPv6 translation. [RFC 8215](https://datatracker.ietf.org/doc/html/rfc8215) has the title *Local-Use IPv4/IPv6 Translation Prefix*. The introduction reads as follows:
```
This document reserves 64:ff9b:1::/48 for local use within domains
that enable IPv4/IPv6 translation mechanisms.  This facilitates the
coexistence of multiple IPv4/IPv6 translation mechanisms in the same
network without requiring the use of a Network-Specific Prefix
assigned from the operator's allocated global unicast address space.
```
So, the RFC describes a `/48` prefix, particularly `64:ff9b:1::/48`, which is intended for situations that require specific local addresses for IPv4/IPv6 translation. The IPv6 address in the example earlier in this post makes use of the `/48` prefix from RFC 8215. Specifically, a `/96` prefix is taken out of this `48` prefix, then the IPv4 address is added to that `/96` prefix.

So far, this post has made the idea clear of how an IPv4 address fits in an IPv6 address and what that looks like in practice. The next essential subjects are related to technical implementation details of IPv4/IPv6 translators. [RFC 6144](https://datatracker.ietf.org/doc/html/rfc6144) has the title *Framework for IPv4/IPv6 Translation*. This RFC is recommended reading for anyone trying to do anything with IPv4/IPv6 translation in a production network.

According to RFC 6144, IPv4/IPv6 translation mechanisms are either *stateful* or *stateless*. *State* is defined as follows in the RFC:
```
State: "State" refers to dynamic information that is stored in a
network element.  For example, if two systems are communicating
using a TCP connection, each stores information about the
connection, which is called "connection state".
```

The RFC gives the following definitions for stateful and stateless translation:
```
Stateful Translation: A translation algorithm may be said to
"require state in a network element" or be "stateful" if the
transmission or reception of a packet creates or modifies a data
structure in the relevant network element.

Stateless Translation: A translation algorithm that is not
"stateful" is "stateless".  It derives its needed information
algorithmically from the messages it is translating and from pre-
configured information.
```

!!! vanaf hier eerst Jool documentatie lezen en dan post bijwerken !!!

One of the most well known examples of *stateful* translation occurs in IPv4-based networks, including private home networks. In this case, the private network uses a private IPv4 subnet as defined in [RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918), like `192.168.1.0/24`. The router for this network will have an interface with an IP in the private network (the LAN side), like `192.168.1.1`, and a public IP, like `62.238.199.13`, on an interface connected to internet (the WAN side), likely a modem from the ISP.
The router will typically perform NAT (network address translation) with PAT (port address translation). For example, when an internal client with the IP `192.168.1.100` wants to reach a resource on the internet with the public IP `8.8.8.8` (Google DNS), the router translates all packets from the client:
1. The private IP `192.168.1.100` gets translated to the public IP `62.238.199.13` (this is the NAT part)
2. In this case, the public IP is a DNS server, so the client will likely send a DNS request to the public IP, using the protocol UDP with the destination port number `53`. The client will use a random UDP source number to listen on for the replies of the server. The packet that the client sends will have the following properties:
    * Source IP: `192.168.1.100`
    * Destination IP: `8.8.8.8`
    * Source port number: `X` (A randomly chosen port number)
    * Destination port number: `53`
3. The router will receive the packet from the client, and send out a translated packet to the server. The translated packet will have the following properties:
    * Source IP: `62.238.199.13` (This is the NAT part, the router uses its own public IP as the source address for the translated packet)
    * Destination IP: `8.8.8.8`
    * Source port number: `Y` (This is the PAT part, the router uses a new random source port number for the translated packet)
    * Destination port number: `53`
4. The server will reply with a packet that has the following properties:
    * Source IP: `8.8.8.8`
    * Destination IP: `62.238.199.13`
    * Source port number: `53` (A new randomly chosen port number)
    * Destination port number: `Y` (the random port number that the router listens to on the public interface)
5. The router will forward the packet with the following properties to the client:
    * Source IP: `8.8.8.8`
    * Destination IP: `192.168.1.100`
    * Source port number: `53`
    * Destination port number: `X` (the random port that the client listens on)

To be able to perform this kind of translation, the router has a NAT table, a table containing the dynamic information with mappings between source and destionation addresses, and source and destination port numbers. The client also keeps a connection table where the source port number can be viewed. On Windows, you can use `netstat -an` to view the connection table. On modern Linux and macOS versions, there are alternative commands available.

According to the definition from the RFC, *stateless* translation is performed algorithmically. Instead of keeping a table with dynamic information, the information needed to translate and forward packets gets derived from configuration. Using the address examples from the introduction of this post, a stateless IPv4/IPv6 translation scenario might involve the following setup. This example uses configuration based on an *Explicit Address Mapping Table (EAMT)* as defined in [RFC 7757](https://datatracker.ietf.org/doc/html/rfc7757).
* Network A: an IPv4-only network that includes a client subnet `192.168.1.0/24`
* Network B: an IPv6-only network with just one local subnet: `64:ff9b::c0a8:0200/120`
* Both networks are connected using a translator that has an IPv4 address in network A (`192.168.1.1`) and an IPv6 address in network B (`64:ff9b::1`)
* The translator contains the EAMT. The EAMT holds configuration statements that tell the translator how to translate between IPv4 and IPv6 networks. Using the Linux library [Jool](https://www.jool.mx/en/) for example, two EAMT (and [SIIT](https://datatracker.ietf.org/doc/html/rfc7915)) configuration statements as applicable to this particular example look like this:
    * `jool_siit -i "1" eamt add 64:ff9b::c0a8:0200/120 192.168.2.0/24`
    * `jool_siit -i "1" eamt add 64:ff9b:1:fffd:1::/96 0.0.0.0/0`
* On the IPv4 side, the translator will listen to packets with a destination of `192.168.2.0/24`, and foward them with translated addresses to `64:ff9b::c0a8:0200/120`. A packet forwarded by an IPv4 client with a destination of `192.168.2.100` results in an IPv6 packet with a destination of `64:ff9b::c0a8:0264`. The source address in the translated IPv6 packet will be based on the `64:ff9b:1:fffd:1::/96` prefix that holds the `0.0.0.0/0` subnet that represents the IPv4 network from the view of the IPv6 network
* On the IPv6 side, the translator will listen to packets with a destination of `64:ff9b:1:fffd:1::/96`, and forward them with translated addresses to any IPv4 destination on the IPv4 side. The source address in the translated IPv4 packet will be the based on the `64:ff9b::c0a8:0200/120` prefix that holds the `192.168.2.0/24` subnet that represents the IPv6 network from the view of the IPv4 network

!!! source address bekijken in jool test, daarna bovenstaande aanvullen/verbeteren !!!

This example is simplified, but it shows how a simple configuration statement in the form of an EAMT can make an entire IPv4 network reachable from an IPv6 network, without requiring the translator to keep dynamic state. Stateless translation is recommended from an operational perspective, as less running code and less memory are required to translate and forward packets. The reduced complexity also facilitates troubleshooting. There are scenarios where stateful translation fits the requirements better, but those are outside the scope of this post. In RFC 6144, those scenarios are discussed extensively, for the interested readers.



- checksums uitleggen
  - IPv4 heeft checksums, IPv6 niet -> waarom niet? IPv6 header is geoptimaliseerd voor packet forwarding, dus fixed length en vereenvoudigd
    - Layer 2 heeft al checksums, en TCP op layer 4 ook. Met IPv4 is een UDP checksum optioneel, met IPv6 is hij verplicht
    - https://networkengineering.stackexchange.com/questions/64803/why-does-the-ipv6-header-not-include-a-checksum
- checksum neutrality uitleggen



Paraphrasing [RFC 8215, section 6](https://datatracker.ietf.org/doc/html/rfc8215#section-6):
```
 In order to attain checksum neutrality, it is imperative
 that the translation prefix be chosen carefully.  Specifically, in
 order for a 96-bit prefix to be checksum neutral, all the
 six 16-bit words in the prefix must add up to a multiple of ffff.
```
The RFC provides a list of example prefixes that meet this requirement of having all of the 16-bit groups of the IPv6 prefix add up to a multiple of `ffff`:

- `64:ff9b:1:fffe::/96`
- `64:ff9b:1:fffd:1::/96`
- `64:ff9b:1:fffc:2::/96`
- `64:ff9b:1:abcd:0:5431::/96`

Hexadecimal addition and subtraction is not something I can do by hand, but the first Google hit for ["hex calculator"](https://www.calculator.net/hex-calculator.html) doesn't have a problem with this task. You can also use the windows calculator by using the view -> programmer mode and setting it to hex:
{{< blogimage "/img/posts/20220424-checksum-neutrality-with-ipv4-ipv6-translators/windows-calculator.png" >}}

Taking the bottom prefix as an example will make the idea clear. The prefix `64:ff9b:1:abcd:0:5431::/96` can be broken down to six groups of 16 bits:

- `64`
- `ff9b`
- `1`
- `abcd`
- `0`
- `5431`

Performing a hexadecimal addition of all of those six numbers results in the number `1FFFE`. Dividing `1FFFE` by 2 results in `FFFF`, proving that adding up all the 16-bit groups of the prefix results in a multiple of `ffff`. Prefixes that add up to a multiple of `ffff` are checksum neutral prefixes.

!!! how many "ffff-multiple" /96 prefixes fit in the /48 prefix? !!!

With the problem space properly defined, what is the answer to the question: do you need to care about checksum neutrality with IPv4/IPv6 translation? It depends.





