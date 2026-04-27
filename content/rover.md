---
title: Autonomous Rover Build
tags: [project, robotics, ardupilot]
---

I'm building a rover that can navigate my neighborhood autonomously. GPS waypoints, curb climbing, the whole deal. The goal is to deliver homebrew to my neighbors without me having to walk it over myself. I make beer, they get beer, everybody wins. Except now I have to build a robot.

Here's the thing about building robots: you don't just learn one skill. You learn twelve. I started this project knowing how to write software. Now I'm doing CAD modeling, Ackerman steering geometry, aluminum fabrication, 3D printing in multiple materials, ArduPilot configuration, and spending way too much time thinking about gear ratios. Each problem solved reveals three more problems I didn't know existed.

![CAD render showing a four-wheeled rover with aluminum frame, large knobby tires, and a rectangular electronics enclosure mounted on top](images/2025-11-final-rover-assembly-perspective.png)
*CAD render of the current design*

![Rover on workbench with all four wheels and steering installed, batteries and wiring exposed on top of frame](images/current-status.jpg)
*Current state of the build*

## Current Status

The drivetrain is the current focus. The gearbox is working and integrated — it took a dual cardan universal joint to solve a height alignment issue between the gearbox output and the wheels, and a full redesign to fix a motor collision when mirroring to the other side. Right now I'm printing parts and assembling, waiting to find the next problem.

## Build Progress

### Frame and Body

The frame is 2020 T-slot aluminum extrusion, 24" x 18". It's basically adult LEGO. I can move things around, drill new holes, and adjust the layout without starting over. The joints use M6 tapped holes. I learned to tap threads into aluminum, which is more satisfying than it has any right to be.

<div class="image-grid">

![Two assembled 2020 aluminum rectangular frames on concrete floor](images/2025-11-10-cut-aluminum-2020-frame-pieces.jpg)
*Assembled frame configurations on the floor*

![Hand holding a tap tool inserted into aluminum extrusion, cutting threads into the end](images/2025-11-11-tapping-threads-in-aluminum-frame.jpg)
*Tapping M6 threads by hand*

![Rectangular aluminum frame on garage floor with four large black wheels placed at the corners](images/2025-11-11-frame-with-wheels-mockup.jpg)
*First mockup with wheels placed for sizing*

![Aluminum frame with black 3D-printed motor mounts and steering components attached](images/2025-11-21-rover-frame-with-servo-and-motor-mounts.jpg)
*Frame with steering and motor mounts installed*

</div>

### Drivetrain

![CAD animation of gearboxes, CV joints, and wheels spinning](images/2026-03-gearbox-cv-joints-wheels-animation.gif)
*Drivetrain — gearboxes, CV joints, and wheels*

Two motors, two ESCs, one dream. The HOBBYWING QUICRUN 1080 G2 ESCs drive 540 40T brushed motors. Brushless would be more efficient, but at 3 mph efficiency doesn't matter. Brushed motors give smooth low-speed control without sensored feedback or fancy ESC tuning, and they're cheaper. Getting power from the motor shafts to the wheels required flexible couplers. Rigid connections would bind up with any misalignment, and there's always misalignment. The bearings are 6000RS with a 10mm bore, and I spent way too long getting the shaft diameter right. 9.98mm fits a 10mm bore smoothly. 10.02mm does not.

<div class="image-grid">

![Brushed motor installed in green 3D-printed motor mount housing on desk](images/2025-09-19-3d-printed-wheel-hub-with-motor-mount.jpg)
*Early motor mount prototype*

![Motor mounted in black 3D-printed bearing housing on workbench with DS3235 servo alongside](images/2025-10-25-bearing-housing-with-servo-mount.jpg)
*Testing the bearing housing and motor alignment*

![Complete assembly showing motor, coupler, bearing housing, and black wheel with tire attached](images/2025-09-28-complete-wheel-motor-test-assembly.jpg)
*Complete drivetrain assembly with wheel attached*

</div>

The initial test drive was humbling. The rover couldn't drive over a small power cord in the garage. When I pushed throttle to the max, one of the motors started smoking. That's when I knew I couldn't get away from learning about gears and gear boxes.

<video controls width="100%">
  <source src="../images/VID_20251209_151820062.mp4" type="video/mp4">
</video>
*Test drive before the gearbox redesign*

I designed a 2-stage gearbox that gives a 40:1 reduction. There are way cooler gear assemblies out there, but this one is mine.

<div class="image-grid">

![Red 3D-printed 2-stage gearbox with motor attached, held in a vise on workbench](images/2026-01-2-stage-gearbox-40-1-reduction.jpg)
*2-stage gearbox with motor attached*

![Black 3D-printed gearbox enclosure with lid open, showing two red spur gears and output shaft](images/2026-02-gearbox-open-enclosure-red-gears.jpg)
*Current gearbox with red spur gears*

</div>

<video controls width="100%">
  <source src="../images/2026-01-gearbox-motor-test.mp4" type="video/mp4">
</video>
*Gearbox bench test with motor*

![Black gearbox with 540 brushed motor attached to a black wheel with knobby tire](images/2026-02-gearbox-motor-wheel-assembly.jpg)
*Gearbox and motor assembly with wheel attached*

Integrating the gearbox into the rover turned out to be its own challenge. The gearbox output doesn't line up with the wheel height — fixing that would destroy ground clearance and require a full frame redesign. Instead, I'm using a dual cardan universal joint to connect the gearbox to the wheel at an angle. A single universal joint causes the output to oscillate faster and slower through each rotation even at constant input speed. A dual cardan joint uses two universal joints so the oscillations cancel, giving constant velocity output.

I [found 3D printable universal joint models](https://www.myminifactory.com/object/3d-print-universal-joint-for-5-10mm-shafts-66248) for 5-10mm shafts that worked for prototyping, but I needed a model in Onshape to get the measurements right before cutting aluminum rods. So I designed my own.

<div class="image-grid">

![CAD render of a custom universal joint design](images/2026-02-custom-universal-joint-cad.png)
*Custom universal joint design*

![Dual cardan universal joint connecting gearbox output shaft to wheel hub on aluminum frame](images/2026-02-dual-cardan-universal-joint-prototype.jpg)
*Dual cardan universal joint prototype*

</div>

With the right-side linkage done, I mirrored it for the left side and hit a new problem: both gearboxes have their motors pointing toward the center of the rover, so when mirrored they collide.

The fix was to redesign the gearbox so the output shaft exits the same side as the motor. Flipping it puts the motor toward the wheel instead of the center — no more overlap.

<div class="image-grid">

![Top-down CAD view of rear axle showing both redesigned gearboxes with motors pointing outward](images/2026-02-gearbox-same-side-output-top.png)
*Redesigned gearboxes — motors no longer overlapping*


![Isometric CAD view of full rover showing redesigned gearbox and electronics enclosure behind it](images/2026-02-gearbox-redesign-rover-context.png)
*Gearbox in context with the rest of the rover*

</div>

The gearbox mount ended up being straightforward. With all the pieces together, I ran the first test of a complete drivetrain assembly — motor, gearbox, CV joints, and wheel — all spinning together for the first time.

<video controls width="100%">
  <source src="../images/2026-03-drivetrain-first-wheel-test.mp4" type="video/mp4">
</video>
*First test of the fully assembled drivetrain for one wheel*

![Overhead view of rover with all four gearboxes, CV joints, and wheels installed on aluminum frame](images/2026-04-drivetrain-complete-overhead.png)
*All four wheel assemblies installed*

Right now I'm printing parts and assembling, waiting to find the next problem.

### Steering

![CAD animation of Ackerman steering showing front wheels turning through full range of motion](images/2026-03-steering-assembly-animation.gif)
*Ackerman steering geometry in motion*

The steering knuckles are 3D-printed and implement Ackerman geometry. The inside wheel turns sharper than the outside wheel through a turn, just like a car. Skid-steer would've been simpler mechanically, but it tears up the tires and fights ArduPilot's GroundSteering logic. A Zoskay DS3235 servo provides 35kg-cm of torque, enough to turn the wheels even when the rover is sitting still on pavement.

The servo mount took four tries to get right. First one didn't fit the servo. Second one had screw holes that were too big. Third one didn't account for the wire coming out of the servo. Fourth time I just removed one side of the mount entirely so the servo could slide in from the side. Sometimes the simple solution is the one you should've tried first.

<div class="image-grid">

![Three black 3D-printed servo mount iterations on a dark surface](images/2025-11-21-servo-mount-failed-prototypes.png)
*Failed servo mount iterations*

![Black 3D-printed steering knuckle with bearings mounted on aluminum frame rail](images/2025-10-25-steering-knuckle-prototype-on-frame.jpg)
*Steering knuckle mounted to the frame*

![Small dark servo arm with metal clevis attachment on cutting mat](images/2025-11-servo-arm-sleeve.jpg)
*Custom servo arm for the steering linkage*

![DS3235 servo installed in black 3D-printed mount with custom arm on aluminum frame](images/2026-01-steering-servo-mount-and-arm.jpg)
*Servo installed with mount and custom arm*

![3D-printed steering linkage bar on cutting mat](images/2026-01-steering-linkage-assembly.jpg)
*Steering linkage bar*

![Top-down view of aluminum frame with steering knuckles and servo mounted, before steering arm installation](images/2025-11-steering-assembly-on-frame.jpg)
*Steering assembly mounted on the frame*

</div>

### Wheels and Tires

I printed my own wheels. Standard curbs are about 15cm, so I went with 17cm diameter to clear them with some margin. They're 6.5cm wide, with a hex hub interface so they pop on and off easily. The wheels are PLA, rigid enough to hold their shape. The tires are TPU, flexible and grippy. I went with 6000RS bearings over cheaper 608 skateboard bearings because the deeper groove handles radial loads better when you're hauling beer over rough terrain. Press-fitting them into PLA hubs requires getting the hole diameter exactly right. Too tight and the bearing won't go in. Too loose and it falls out. I got it right eventually.

<div class="image-grid">

![White PLA wheel hub sitting on 3D printer bed with honeycomb infill pattern visible](images/2025-09-19-wheel-hub-on-printer-bed.jpg)
*PLA wheel hub fresh off the printer*

![Several wheel hubs and black TPU tires spread out on workbench for test fitting](images/2025-09-21-multiple-wheels-and-tires-laid-out.jpg)
*Tire fit on wheel prototype*

![Two completed wheels with white hubs and black knobby tires side by side](images/2025-09-23-two-complete-wheel-assemblies.jpg)
*Final wheels and tires*

</div>

The gearbox redesign needed a new drive wheel hub. I went with a 5-lug design, planning to use heat inserts in the wheel so the hub could bolt on cleanly. The problem was the lack of infill in the wheel. The heat inserts just fell right into the plastic. I don't want to waste the wheels though, so super glue will work for now. If I need to reprint the wheels I'll bump up the infill, though I didn't keep track of what I used for these ones. Lesson learned on documenting print settings. But I probably won't keep track of the next ones either.

<div class="image-grid">

![Black 3D-printed wheel hub with 5-lug bolt pattern and metal shaft](images/2026-02-5-lug-wheel-hub.jpg)
*New 5-lug wheel hub*

![Wheel hub mounted inside black wheel with knobby tire](images/2026-02-wheel-hub-mounted-in-wheel.jpg)
*Hub mounted in the wheel*

</div>

### Electronics

The brain is a SpeedyBee F405 WING running ArduPilot Rover firmware. It's a flight controller, but ArduPilot doesn't care that I'm on the ground. GPS comes from a Matek M10Q-5883 module with a built-in compass. RC control uses ExpressLRS protocol. Low latency, good range, and if I mess up the autonomous navigation I can take over manually.

Power is two 3S LiPo batteries, 15000mAh each. That's 333Wh total, which should be enough to deliver a lot of beer before needing a recharge. Laying everything out on the garage floor helped me figure out what size enclosure I'd need.

<div class="image-grid">

![Batteries, ESCs, and wiring spread out on concrete garage floor for sizing](images/2025-10-31-power-distribution-batteries-and-escs.jpg)
*Planning the electronics layout on the garage floor*

![Black 3D-printed enclosure interior with brass heat-set inserts installed throughout](images/2025-12-electronics-enclosure-heat-inserts.jpg)
*Enclosure with heat inserts installed*

</div>

Inside the enclosure, I designed caddies for the batteries, flight controller, and ESCs. Each component velcro-straps to a caddy, and the caddies screw into the enclosure where I added heat inserts. It keeps everything modular and easy to swap out when I inevitably fry something.

<div class="image-grid">

![CAD render of electronics enclosure with component caddies sitting on their mounting holes](images/2026-02-electronics-enclosure-caddies-cad.png)
*Enclosure with component caddies*

![Inside of black enclosure showing batteries and ESCs installed with wiring](images/2025-12-electronics-caddies-detail.jpg)
*Enclosure with batteries and ESCs installed*

![Rover frame with steering linkage, motors, and electronics box assembled but no wheels attached](images/2025-11-dry-fit-steering-drivetrain-enclosure.jpg)
*Dry fit of major components without wheels*

</div>

![Rover with V1 electronics enclosure bolted to frame, power switch on side, all four wheels installed](images/2026-04-electronics-enclosure-v1-on-rover.png)
*V1 electronics enclosure installed on the rover*

### ArduPilot Configuration

I spent three days figuring out that "Roll" controls steering in rover mode, not "Yaw" like you'd expect. The motors use SERVO function 70 (throttle), and steering uses function 26 (GroundSteering). Now it makes sense. At the time, it did not.

## Specifications

| Requirement | Specification |
|-------------|---------------|
| Payload capacity | 10 lbs |
| Target speed | ~3 mph |
| Terrain | Paved surfaces, sidewalks, curbs, grass, mild grades |
| Navigation | GPS waypoint autonomy via ArduPilot |
| Operating range | Multi-kilometer |

| System | Component | Details |
|--------|-----------|---------|
| Frame | 2020 aluminum extrusion | 24" x 18" bolted frame |
| Drivetrain | Brushed DC motors | Dual HOBBYWING QUICRUN 1080 G2 ESCs, 540 40T motors |
| Steering | Ackerman geometry | Zoskay DS3235 servo (35kg-cm torque) |
| Flight controller | SpeedyBee F405 WING | STM32F405 @ 168MHz, ArduPilot Rover firmware |
| GPS | Matek M10Q-5883 | GPS + magnetometer module |
| Power | Dual 3S LiPo | 15000mAh each, 333Wh total capacity |
| Wheels | Custom 3D-printed | 17cm diameter, 6.5cm width, 6000RS bearings |
| RC | ExpressLRS | Radiomaster TX12 MKII transmitter, BetaFPV SuperD receiver |

## See Also

- [[misc/cad|CAD Models]] - Onshape renders and design views
- [[misc/notes|Design Notes and Calculations]] - Hand-drawn sketches and calculations
