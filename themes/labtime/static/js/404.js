randomnum = Math.floor(Math.random() * 448);
var biglist = [
    "ACCESS DENIED, lcars command net not available",
    "clock speed",
    "solar flares",
    "electromagnetic radiation from satellite debris",
    "static from nylon underwear",
    "static from plastic slide rules",
    "global warming",
    "poor power conditioning",
    "static buildup",
    "doppler effect",
    "hardware stress fractures",
    "magnetic interference from money/credit cards",
    "dry joints on cable plug",
    "we're waiting for [the phone company] to fix that line",
    "sounds like a Windows problem, try calling Microsoft support",
    "temporary routing anomaly",
    "somebody was calculating pi on the server",
    "fat electrons in the lines",
    "excess surge protection",
    "floating point processor overflow",
    "divide-by-zero error",
    "POSIX compliance problem",
    "monitor resolution too high",
    "improperly oriented keyboard",
    "network packets travelling uphill (use a carrier pigeon)",
    "decreasing electron flux",
    "first Saturday after first full moon in Winter",
    "radiosity depletion",
    "CPU radiator broken",
    "It works the way the Wang did, what's the problem?",
    "positron router malfunction",
    "cellular telephone interference",
    "tectonic stress",
    "piezo-electric interference",
    "(l)user error",
    "working as designed",
    "dynamic software linking table corrupted",
    "heavy gravity fluctuation, move computer to floor rapidly",
    "secretary plugged hairdryer into UPS",
    "terrorist activities",
    "not enough memory, go get system upgrade",
    "interrupt configuration error",
    "spaghetti cable caused packet failure",
    "boss forgot system password",
    "bank holiday - system operating credits  not recharged",
    "virus attack, luser responsible",
    "waste water tank overflowed onto computer",
    "Complete Transient Lockout",
    "bad ether in the cables",
    "bogon emissions",
    "change in Earth's rotational speed",
    "cosmic ray particles crashed through the hard disk platter",
    "smell from unhygienic janitorial staff wrecked the tape heads",
    "little hamster in running wheel had coronary; waiting for replacement to be Fedexed from Wyoming",
    "evil dogs hypnotized the night shift",
    "plumber mistook routing panel for decorative wall fixture",
    "electricians made popcorn in the power supply",
    "groundskeepers stole the root password",
    "high pressure system failure",
    "failed trials, system needs redesigned",
    "system has been recalled",
    "not approved by the FCC",
    "need to wrap system in aluminum foil to fix problem",
    "not properly grounded, please bury computer",
    "CPU needs recalibration",
    "system needs to be rebooted",
    "bit bucket overflow",
    "descramble code needed from software company",
    "only available on a need to know basis",
    "knot in cables caused data stream to become twisted and kinked",
    "nesting roaches shorted out the ether cable",
    "The file system is full of it",
    "Satan did it",
    "daemons did it",
    "you're out of memory",
    "there isn't any problem",
    "unoptimized hard drive",
    "typo in the code",
    "yes, yes, its called a design limitation",
    "Look, buddy - Windows 3.1 IS a General Protection Fault.",
    "That's a great computer you have there; have you considered how it would work as a BSD machine?",
    "Please excuse me, I have to circuit an AC line through my head to get this database working.",
    "Yeah, yo mama dresses you funny and you need a mouse to delete files.",
    "support staff hung over, send aspirin and come back LATER.",
    "someone is standing on the ethernet cable",
    "Windows 95 undocumented 'feature'",
    "runt packets",
    "password is too complex to decrypt",
    "boss' kid fucked up the machine",
    "electromagnetic energy loss",
    "budget cuts",
    "mouse chewed through power cable",
    "stale file handle (next time use Tupperware(tm)!)",
    "feature not yet implimented",
    "internet outage",
    "Pentium FDIV bug",
    "vendor no longer supports the product",
    "small animal kamikaze attack on power supplies",
    "the vendor put the bug there.",
    "SIMM crosstalk.",
    "IRQ dropout",
    "collapsed backbone",
    "power company testing new voltage spike (creation) equipment",
    "operators on strike due to broken coffee machine",
    "backup tape overwritten with copy of system manager's favourite CD",
    "UPS interrupted the server's power",
    "The electrician didn't know what the yellow cable was so he yanked the ethernet out.",
    "The keyboard isn't plugged in",
    "The air conditioning water supply pipe ruptured over the machine room.",
    "The electricity substation in the car park blew up.",
    "The Rolling Stones concert down the road caused a brown out.",
    "The salesman drove over the CPU board.",
    "The monitor is plugged into the serial port.",
    "root nameservers are out of sync",
    "electro-magnetic pulses from French above ground nuke testing",
    "your keyboard's space bar is generating spurious keycodes",
    "the real ttys became pseudo ttys and vice-versa",
    "the printer thinks it's a router",
    "the router thinks it's a printer",
    "evil hackers from Serbia",
    "we just switched to FDDI",
    "halon system went off and killed the operators",
    "because Bill Gates is a Jehovah's Witness and so nothing can work on St. Swithin's day",
    "user to computer ratio too high",
    "user to computer ratio too low",
    "we just switched to Sprint",
    "it has Intel Inside",
    "sticky bits on disk",
    "power company having EMP problems with their reactor",
    "the ring needs another token",
    "new management",
    "telnet - unable to connect to remote host - connection refused",
    "SCSI chain overterminated",
    "it's not plugged in.",
    "because of network lag due to too many people playing deathmatch",
    "you put the disk in upside down",
    "daemons loose in system.",
    "user was distributing pornography on server; system seized by FBI",
    "BNC (brain not connected)",
    "UBNC (user brain not connected)",
    "disks spinning backwards - toggle the hemisphere jumper",
    "new guy cross-connected phone lines with ac power bus",
    "had to use hammer to free stuck disk drive heads.",
    "too few computrons available",
    "flat tire on station wagon with tapes ('Never underestimate the bandwidth of a station wagon full of tapes hurling down the highway' -- Andrew S. Tanenbaum) ",
    "communications satellite used by the military for Star Wars",
    "party-bug in the Aloha protocol",
    "insert coin for new game",
    "dew on the telephone lines.",
    "Arcserve crashed the server again",
    "someone needed the powerstrip, so they pulled the switch plug",
    "my pony-tail hit the on/off switch on the power strip",
    "big to little endian conversion error",
    "you can tune a file system, but you can't tune a fish (from most tunefs man pages)",
    "dumb terminal",
    "zombie processes haunting the computer",
    "incorrect time synchronization",
    "defunct processes",
    "stubborn processes",
    "non-redundant fan failure ",
    "monitor VLF leakage",
    "bugs in the RAID",
    "no 'any' key on keyboard",
    "root rot",
    "backbone scoliosis",
    "/pub/lunch",
    "excessive collisions & not enough packet ambulances",
    "le0 - no carrier - transceiver cable problem?",
    "broadcast packets on wrong frequency",
    "popper unable to process jumbo kernel",
    "NOTICE - alloc - /dev/null - filesystem full",
    "pseudo-user on a pseudo-terminal",
    "recursive traversal of loopback mount points",
    "backbone adjustment",
    "OS swapped to disk",
    "vapors from evaporating sticky-note adhesives",
    "stiction",
    "short leg on process table",
    "multicasts on broken packets",
    "ether leak",
    "Attila the Hub",
    "endothermal recalibration",
    "filesystem not big enough for Jumbo Kernel Patch",
    "loop found in loop in redundant loopback",
    "system consumed all the paper for paging",
    "permission denied",
    "Reformatting Page. Wait...",
    "..disk or the processor is on fire",
    "SCSI's too wide",
    "Proprietary Information",
    "just type 'mv * /dev/null'",
    "runaway cat on system.",
    "Did you pay the new Support Fee?",
    "we only support a 1200 bps connection",
    "we only support a 28000 bps connection",
    "Me no internet, only janitor, me just wax floors.",
    "I'm sorry a Pentium won't do, you need an SGI to connect with us.",
    "Post-it Note Sludge leaked into the monitor.",
    "the curls in your keyboard cord are losing electricity",
    "the monitor needs another box of pixels",
    "RPC_PMAP_FAILURE",
    "kernel panic - write-only-memory (/dev/wom0) capacity exceeded.",
    "Write-only-memory subsystem too slow for this machine. Contact your local dealer.",
    "Just pick up the phone and give modem connect sounds. 'Well, you said we should get more lines so we don't have voice lines.'",
    "quantum dynamics are affecting the transistors",
    "police are examining all internet packets in the search for a narco-net-trafficer",
    "We are currently trying a new concept of using a live mouse.  Unfortuantely, one has yet to survive being hooked up to the computer.....please bear with us.",
    "Your mail is being routed through Germany ... and they're censoring us.",
    "Only people with names beginning with 'A' are getting mail this week (a la Microsoft)",
    "We didn't pay the Internet bill and it's been cut off.",
    "lightning strikes",
    "Of course it doesn't work. We've performed a software upgrade.",
    "change your language to Finnish.",
    "Fluorescent lights are generating negative ions. If turning them off doesn't work, take them out and put tin foil on the ends.",
    "high nuclear activity in your area",
    "What office are you in? Oh, that one.  Did you know that your building was built over the universities first nuclear research site? And wow, aren't you the lucky one, your office is right over where the core is buried!",
    "the MGs ran out of gas",
    "the UPS doesn't have a battery backup",
    "Recursivity.  Call back if it happens again.",
    "someone thought the Big Red Button was a light switch",
    "The mainframe needs to rest.  It's getting old, you know.",
    "I'm not sure.  Try calling the Internet's head office -- it's in the book.",
    "The lines are all busy (busied out, that is -- why let them in to begin with?).",
    "Jan  9 16 -41 -27 huber su - 'su root' succeeded for .... on /dev/pts/1",
    "It's those computer people in X {city of world}.  They keep stuffing things up.",
    "a star wars satellite accidently blew up the WAN",
    "fatal error right in front of screen",
    "That function is not currently supported, but Bill Gates assures us it will be featured in the next upgrade.",
    "wrong polarity of neutron flow",
    "lusers learning curve appears to be fractal",
    "We had to turn off that service to comply with the CDA/DMCA/SSSCA.",
    "ionisation from the air-conditioning",
    "TCP/IP UDP alarm threshold is set too low",
    "Someone is broadcasting pigmy packets and the router dosn't know how to deal with them.",
    "The new frame relay network hasn't bedded down the software loop transmitter yet. ",
    "fanout dropping voltage too much, try cutting some of those little traces",
    "plate voltage too low on demodulator tube",
    "You did wha... oh _dear_....",
    "CPU needs bearings repacked",
    "Too many little pins on CPU confusing it, bend back and forth until 10-20% are neatly removed. Do _not_ leave metal bits visible!",
    "_Rosin_ core solder? But...",
    "Software uses US measurements, but the OS is in metric...",
    "The computer fletely, mouse and all.",
    "your cat tried to eat the mouse",
    "The Borg tried to assimilate your system. Resistance is futile.",
    "It must have been the lightning storm we had (yesterdy) (last week) (last month)",
    "Due to budget problems we have been forced to cut back on the number of users able to access the system at one time. (namely none allowed....)",
    "too much radiation coming from the soil",
    "Unfortunately we have run out of bits/bytes/whatever. Don't worry, the next supply will be coming next week.",
    "program load too heavy for processor to lift",
    "processes running slowly due to weak power supply",
    "our ISP is having {switching,routing,SMDS,frame relay} problems",
    "we've run out of licenses",
    "interference from lunar radiation",
    "standing room only on the bus",
    "you need to install an RTFM interface",
    "that would be because the software doesn't work",
    "that's easy to fix, but I can't be bothered",
    "someone's tie is caught in the printer, and if anything else gets printed, he'll be in it too",
    "we're upgrading /dev/null",
    "the Usenet news is out of date",
    "our POP server was kidnapped by a weasel",
    "it's stuck in the Web",
    "your modem doesn't speak English",
    "the mouse escaped",
    "all of the packets are empty",
    "the UPS is on strike",
    "neutrino overload on the nameserver",
    "melting hard drives",
    "someone has messed up the kernel pointers",
    "the kernel license has expired",
    "Netscape has crashed",
    "the cord jumped over and hit the power switch",
    "it was OK before you touched it",
    "bit rot",
    "U.S. Postal Service",
    "your flux capacitor has gone bad",
    "the dilithium crystals need to be rotated",
    "the static electricity routing is acting up...",
    "traceroute says that there is a routing problem in the backbone.  It's not our problem.",
    "the co-locator cannot verify the frame-relay gateway to the ISDN server",
    "High altitude condensation from USAF prototype aircraft has contaminated the primary subnet mask. Turn off your computer for 9 days to avoid damaging it.",
    "lawn mower blade in your fan needs sharpening",
    "electrons on a bender",
    "telecommunications is upgrading",
    "telecommunications is downgrading",
    "telecommunications is downshifting",
    "Hard drive sleeping. Let it wake up on it's own...",
    "interference between the keyboard and the chair",
    "the CPU has shifted, and become decentralized",
    "due to the SSSCA, we no longer have a root account",
    "We ran out of dial tone and we're and waiting for the phone company to deliver another bottle.",
    "you must've hit the wrong anykey",
    "PCMCIA slave driver",
    "The token fell out of the ring. Call us when you find it.",
    "the hardware bus needs a new token",
    "too many interrupts",
    "not enough interrupts",
    "the data on your hard drive is out of balanc.",
    "Digital Manipulator exceeding velocity parameters",
    "appears to be a Slow/Narrow SCSI-0 Interface problem",
    "microelectronic Riemannian curved-space fault in write-only file system",
    "fractal radiation jamming the backbone",
    "routing problems on the neural net",
    "IRQ-problems with the Un-Interruptable-Power-Supply",
    "CPU-angle has to be adjusted because of vibrations coming from the nearby road",
    "emissions from GSM-phones",
    "CD-ROM server needs recalibration",
    "firewall needs cooling",
    "asynchronous inode failure",
    "transient bus protocol violation",
    "incompatible bit-registration operators",
    "your process is not ISO 9000 compliant",
    "you need to upgrade your VESA local bus to a MasterCard local bus",
    "the recent proliferation of Nuclear Testing",
    "elves on strike. (Why do they call EMAG Elf Magic)",
    "Internetluser level excessive, please wait until a luser logs off before attempting to log back on.",
    "Your e-mail is now being delivered by the USPS.",
    "Your computer hasn't been returning all the bits it gets from the Internet.",
    "you've been infected by the Telescoping Hubble virus",
    "scheduled global CPU outage",
    "Your Pentium has a heating problem - try cooling it with ice cold water. (Do not turn off your computer, you do not want to cool down the Pentium while he isn't working, do you?)",
    "Your processor has processed too many intructions.  Turn it off immediately, do not type any commands!",
    "your packets were eaten by the terminator",
    "your processor does not develop enough heat",
    "We need a licensed electrician to replace the light bulbs in the computer room.",
    "the POP server is out of Coke",
    "fiber optics caused gas main leak",
    "server depressed, needs Prozac",
    "quantum decoherence",
    "those damn racoons!",
    "suboptimal routing experience",
    "a plumber is needed, the network drain is clogged",
    "50% of the manual is in .pdf readme files",
    "the AA battery in the wallclock sends magnetic interference",
    "the xy axis in the trackball is coordinated with the summer solstice",
    "the butane lighter causes the pincushioning",
    "old inkjet cartridges emanate barium-based fumes",
    "manager in the cable duct",
    "We'll fix that in the next (upgrade, update, patch release, service pack).",
    "HTTPD Error 666  - BOFH was here",
    "HTTPD Error 4004  - very old Intel cpu - insufficient processing power",
    "The ATM board has run out of 10 pound notes.  We are having a whip round to refill it, care to contribute?",
    "network failure -  call NBC",
    "having to manually track the satellit.",
    "Your/our computer(s) had suffered a memory leak, and we are waiting for them to be topped up.",
    "the rubber band broke",
    "we're on Token Ring, and it looks like the token got loose",
    "stray alpha particles from memory packaging caused hard memory error on server",
    "paradigm shift...without a clutch",
    "PEBKAC (Problem Exists Between Keyboard And Chair)",
    "the cables are not the same length",
    "second-sytem effect.",
    "chewing gum on /dev/sd3c",
    "boredom in the kernel",
    "the daemons! the daemons! the terrible daemons!",
    "I'd love to help you -- it's just that the Boss won't let me near the computer.",
    "struck by the Good Times virus",
    "your parity check is overdrawn and you're out of cache",
    "Communist revolutionaries taking over the server room and demanding all the computers in the building or they shoot the sysadmin. Poor misguided fools.",
    "plasma conduit breach",
    "out of cards on drive D -",
    "sand fleas eating the Internet cables",
    "parallel processors running perpendicular today",
    "ATM cell has no roaming feature turned on, notebooks can't connect",
    "webmasters kidnapped by evil cult",
    "failure to adjust for daylight savings time",
    "virus transmitted from computer to sysadmins",
    "virus due to computers having unsafe sex",
    "incorrectly configured static routes on the core routers",
    "forced to support NT servers; sysadmins quit",
    "suspicious pointer corrupted virtual machine",
    "it's the InterNIC's fault",
    "root name servers corrupted",
    "budget cuts forced us to sell all the power cords for the servers",
    "someone hooked the twisted pair wires into the answering machine",
    "operators killed by year 2000 bug bite",
    "we've picked COBOL as the language of choice",
    "operators killed when huge stack of backup tapes fell over",
    "robotic tape changer mistook operator's tie for a backup tape",
    "someone was smoking in the computer room and set off the halon systems",
    "it's an ID-10-T error",
    "dyslexics retyping hosts file on servers",
    "the Internet is being scanned for viruses",
    "your computer's union contract is set to expire at midnight",
    "bad user karma",
    "/dev/clue was linked to /dev/null",
    "increased sunspot activity",
    "we already sent around a notice about that",
    "It's union rules. There's nothing we can do about it. Sorry.",
    "interferance from the Van Allen Belt",
    "Jupiter is aligned with Mars",
    "redundant ACLs",
    "mail server hit by UniSpammer",
    "T-1's congested due to porn traffic to the news server",
    "data for intranet got routed through the extranet and landed on the internet",
    "what you are experiencing is not a problem; it is an undocumented feature",
    "sales staff sold a product we don't offer",
    "secretary sent chain letter to all 5000 employees",
    "sysadmin didn't hear pager go off due to loud music from bar-room speakers",
    "sysadmin accidentally destroyed pager with a large hammer",
    "sysadmins unavailable because they are in a meeting talking about why they are unavailable so much",
    "bad cafeteria food landed all the sysadmins in the hospital",
    "route flapping at the NAP",
    "computers under water due to SYN flooding",
    "the vulcan-death-grip ping has been applied",
    "electrical conduits in machine room are melting",
    "traffic jam on the Information Superhighway",
    "Radial Telemetry Infiltration",
    "cow-tippers tipped a cow onto the server",
    "tachyon emissions overloading the system",
    "maintenance window broken",
    "we're out of slots on the server",
    "Computer room being moved.  Our systems are down for the weekend.",
    "sysadmins busy fighting spam",
    "repeated reboots of the system failed to solve problem",
    "feature was not beta tested",
    "domain controler not responding",
    "someone else stole your IP address, call the Internet detectives!",
    "it's not RFC-822 compliant",
    "operation failed because - there is no message for this error (#1014)",
    "stop bit received",
    "internet is needed to catch the etherbunny",
    "network down, IP packets delivered via UPS",
    "firmware update in the coffee machine",
    "temporal anomaly",
    "Mouse has out-of-cheese-error",
    "Borg implants are failing",
    "Borg nanites have infested the server",
    "error - one bad user found in front of screen",
    "please state the nature of the technical emergency",
    "Internet shut down due to maintainance",
    "daemon escaped from pentagram",
    "crop circles in the corn shell",
    "sticky bit has come loose",
    "Hot Java has gone cold",
    "cache miss - please take better aim next time",
    "hash table has woodworm",
    "Trojan horse ran out of hay",
    "zombie processess detected, machine is haunted",
    "overflow error in /dev/null",
    "browser's cookie is corrupted -- someone's been nibbling on it",
    "mailer-daemon is busy burning your message in hell.",
    "according to Microsoft, it's by design",
    "vi needs to be upgraded to vii",
    "greenpeace free'd the mallocs"
];
document.write(biglist[randomnum] + "<br>");
