---
date: 2021-11-07 00:00:00+00:00
title: Virtual PfSense Messes Up Interface Assignments
url: /blogs/20211107-virtual-pfsense-messes-up-interface-assignments/
page_id: _20211107_virtual_pfsense_messes_up_interface_assignments
featured_image: /img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/pfsense-logo.png
description: "Making changes to PfSense interfaces when running it in a virtual machine can cause the system to confuse its interface assignments."
tags:
- pfsense
- firewall
- networking
- vmware
- network interfaces
- virtualization
---

As readers of this blog might know, I've been a long time user of PfSense. Throughout the years, this firewall has served me well, even though certain features don't seem to get the priority they deserve (hello [zone based firewall policies](https://redmine.pfsense.org/issues/4165)). Recently, I've encountered some quirky behavior on multiple occassions. When running PfSense in a virtual machine, certain scenarios can cause the software to become confused about interface assignments. These scenarios can be difficult to mitigate. This post shows you how to restore the firewall to its proper state.
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/pfsense-logo.png" >}}
<!--more-->

When running PfSense in a virtual machine on hypervisors like VMware and Proxmox, I've noticed the following situations can make PfSense lose its correct interface assignments:

* Powering off the VM, then adding or removing a bunch of virtual network interfaces
* Moving the VM to another hypervisor (or even a hypervisor running different virtualization software)

It can be rather difficult to restore the firewall to a correct configuration. Let's see what the problem is about using a fresh install of PfSense with just two interfaces. I'm using ESXi 7.0 for this demonstration.
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/fresh-pfsense-install.png" >}}

The WAN interface learned its IP address from my test subnet using DHCP. The LAN interface has the default static IP address that PfSense assigns after a fresh install. In VMware, the interfaces have the following properties:
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/fresh-pfsense-install-interfaces-vmware.png" >}}

In PfSense, from the shell we can confirm the interface assignments by looking at the MAC addresses using ifconfig. The pixel real estate of the virtual console is quite small, so you can use `ifconfig | less` to have a look at things.
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/fresh-pfsense-install-interface-macs.png" >}}

From the PfSense main menu, using the *Assign Interfaces* option (Option 1), gives another overview of the assignment of virtual network interfaces to PfSense internal network interfaces, and their corresponding MAC addresses.
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/fresh-pfsense-install-interface-assignments.png" >}}

I made a snapshot, then I used the virtual machine in this demonstration to try to reproduce the problem I mentioned earlier. To be fair, I wasn't easily able to break the interface assignment in my test setup. During this test, just adding an interface and booting kept the assignments of the original two interfaces intact. Removing the new interfaces again has the same result, everything remains correct.  
To break things, I had to remove the first interface, then add two new ones and swap the VLAN assignments in VMware and the corresponding static MAC address around. In VMware, you can already tell something went wrong from the virtual interface overview:
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/changed-pfsense-interfaces-vmware.png" >}}

Suddenly, the interface with VLAN 10 and the WAN mac address is called *Network adapter 2*. Another sign is that the WAN interface isn't able to get a DHCP address during the boot process, causing a timeout of a couple of minutes. The only thing to do is wait this out.
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/wan-interface-timeout-on-boot.png" >}}

When the changed PfSense is booted, the WAN interface won't have an IP address. The LAN interface looks correct.
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/changed-pfsense-booted.png" >}}

Let's inspect the interface assignments:
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/changed-pfsense-interface-assignment.png" >}}

The screenshot above shows the problem. The interface called vmx0 now has the MAC address, and thus the VLAN assignment, of what used to be vmx1. Interface vmx1 has the MAC address of what used to be vmx0. So even though from the boot screen the LAN interface still looks correct, it is now actually operating in the wrong VLAN. The screenshot above also shows the fix to the problem: assigning the WAN and LAN interfaces to the interface names with the correct MAC addresses.

This example shows a situation which is difficult to restore because you need to cross reference multiple pieces of information. The screenshot from the changed interface overview in VMware shows the relation between the interface MAC address and its VLAN assignment. In PfSense, the interface assignment overview shows the relation between the interface MAC address and the virtual network interface name.

The *Assign Interfaces* menu asks you to give the virtual network interface name for each PfSense network interface name. For example, if you know which VLAN is the WAN VLAN, and you know the corresponding MAC address, you can look up the corresponding virtual interface name. All interface assignments can be restored like this. After restoring the interface assignments, the system will ask for a confirmation and reload the configuration. If you didn't forget to sacrifice a goat, the firewall will be returned to a proper functioning state.

One of the challenges you run into is losing admin access to check things and fix them with the web interface, because the VLAN assignment gets broken by this problem. Another challenge is that things get very complicated cross referencing the required information when you have lots of interfaces. Also, when I moved a virtual PfSense from Proxmox to VMware, PfSense lost all of its interface names except for WAN and LAN. The rest of the interfaces where just called OPT1, OPT2 etc even though they previously had different names that made more sense, like vlan201_wan1, vlan201_wan2 etc. This can become a nightmare to restore, requiring multiple tries and quite some restore time. You need to wait out the WAN interface timeout and do quite some manual work with MAC addresses and other tasks for each restore try. If you manage to get management access to the web interface via the LAN interface, you can find that interface configuration, firewall rules and other configuration that's assigned to interfaces is all lost. So unless you want to rebuild a box from scratch, you'd better make sure you get the interface assignments restored properly. I wouldn't recommend making changes or migrations like this during time constrained maintenance windows.

What's clear at this point is that having lots of virtual interfaces on your PfSense machine does not scale. In new deployments, I ended up using three virtual interfaces:

* WAN: this one is self-explanatory
* LAN: actually used as a management interface
* A VLAN trunk, to be used with VLAN interfaces for each additional subnet that the firewall needs to connect to

In VMware, the virtual network interfaces of the virtual machines are attached to a port group. The port group then gets attached to a vSwitch, and the vSwitch gets attached to the physical network interfaces of the hypervisor. The configuration of the port groups determines how VLAN tagging is handled. You can either have a port group with a single VLAN ID assigned, to basically bridge virtual network interfaces straight into that VLAN (untagged), or you can have a port group with the VLAN ID set to *4095*, causing the port group to become a VLAN trunk. Virtual machines that are attached to a port group that's configured as a VLAN trunk will have to handle VLAN tagging within the virtual machine itself. The port group configuration in VMware looks like this:
{{< blogimage "/img/posts/20211107-virtual-pfsense-messes-up-interface-assignments/vmware-vlans.png" >}}

With my proposed setup, the PfSense VM will have three virtual network interfaces: two that are attached to basic port groups with a single VLAN each, one for WAN and one for LAN / management. The third virtual interface gets assigned to the Trunk port group. Within PfSense, VLAN interfaces can be created and assigned to the trunking virtual network interface. In the past, I have heard some debate about where to handle the VLAN tagging when running firewalls in virtual machines. I've heard it being said that handling the VLAN tagging within the hypervisor as opposed to within the VM, that would lead to better performance. I doubt that this still holds true. I have not done any performance testing to determine the difference though. That might be an interesting excercise for the future.

Assuming there is enough performance overhead available, my proposed setup should be enough to serve a variety of situations. Alternative setups are also possible of course. For example, you might just have two virtual network interfaces, one for management, and one for the VLAN trunk, tagging all the other interfaces you need (WAN, LAN, etc) on the VLAN trunk.

I hope that this information about how PfSense handles interface assignments will be of use to others facing similar situations. If you'd like to discuss the details that are involved, feel free to leave any comments or questions on Twitter or LinkedIn.
