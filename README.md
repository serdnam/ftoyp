# Ftoyp

Toy FTP server built on Deno, currently only supporting active mode.

Ftoyp binds to port 21 for the control connection (requiring root privileges).

You can try it out with the following, the last parameter is the directory of files to serve

```
deno run --allow-net --allow-read  --unstable  src/server/main.ts ./files

```

You can test it out with

```
curl -vv --no-eprt -P - ftp://localhost/TEST
```
