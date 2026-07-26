

## Enable Hotplug in Proxmox
- Stop the Debian VM.
- Go to the VM's Hardware tab, click Processors, and configure the Cores and Sockets to the maximum amount of CPUs you might ever need.
- Make sure to check the box for NUMA if your guest needs it.
- Go to Options, select Hotplug, tick CPU, and click OK.
- Start the VM.
## Configure Debian to Automatically Online Hot-plugged CPUs
- Open the terminal inside your Debian VM.
- Create and edit a new udev rule file: 
```
sudo nano /etc/udev/rules.d/80-hotplug-cpu.rules
```
- Paste the following line into the file:
```
SUBSYSTEM=="cpu", ACTION=="add", TEST=="online", ATTR{online}=="0", ATTR{online}="1"
```
- Reload the udev rules to apply the change:
```
sudo udevadm control --reload-rules
```
## Dynamically Increase the CPU count
- Go to the VM's Hardware tab, double-click Processors, and modify the active CPU count (as long as it doesn't exceed the maximum configured above).
- You can also do this in the Proxmox Shell using qm set <VMID> -cores <number>
