---
title: CUPS：共享打印机服务
date: 2025-12-26 16:26:50
tags: Docker
---
CUPS 是一个基于标准的开源打印系统，适用于 Linux®及其他类 Unix®作系统。CUPS 支持打印至：

+ [AirPrint™](https://support.apple.com/en-us/HT201311) 和 [IPP Everywhere™](https://www.pwg.org/printers) 打印机，
+ 网络和本地（USB）打印机，以及打印机应用程序，

- 网络和本地（USB）打印机，使用（传统）基于 PPD 的打印机驱动程序。

在远程机器上运行 CUPS 打印服务器，通过 WiFi 共享 USB 打印机。其可以部署在Linux 系统、Unix 系统及 Docker 中，你可以使用家里的 Nas、OpenWrt、树莓派等等可以运行 docker 环境的硬件运行起来，但需要注意的是，如果你的打印机只有 USB 接口，你需要使用带有 USB 接口的硬件运行，使得 CUPS 和打印机能够正常通信；

家里刚好有一台机基于 X86Debian 系统的飞牛 NAS 系统，我们将在他上面部署 CUPS 并共享至家里的局域网中，所有链接该局域网的设备就可以无登录打印。

## 安装

Github：[CUPS-Docker](https://github.com/anujdatar/cups-docker)

你可以是用默认参数快捷启动，直接打开终端，输入以下命令：

```bash
docker run -d -p 631:631 --device /dev/bus/usb --name cups anujdatar/cups
```

或者手动设置各个参数

```bash
docker run -d --name cups \
    --restart unless-stopped \
    -p 631:631 \
    --device /dev/bus/usb \
    -e CUPSADMIN=batman \
    -e CUPSPASSWORD=batcave_password \
    -e TZ="America/Gotham" \
    -v <persistent-config-folder>:/etc/cups \
    anujdatar/cups
```

当然，你也可以使用 dcoekr-compose 来安装

```yml
version: "3"
services:
    cups:
        image: anujdatar/cups
        container_name: cups
        restart: unless-stopped
        ports:
            - "631:631"
        devices:
            - /dev/bus/usb:/dev/bus/usb
        environment:
            - CUPSADMIN=batman
            - CUPSPASSWORD=batcave_password
            - TZ="Asia/Shanghai"
        volumes:
            - <persistent-config-path>:/etc/cups
```

`environment`中需要注意的是账户和密码需要设置为你自己的，这在后面将会使用到。

![image-20251226135815333](https://image.tanzicai.top/typora/2025/12/26/694e240509b3e.png)

## 配置



