from subprocess import call
import os

pwd = "DIRECTORY_CONTAINING_PHANTOMJS"

with open('top-million-sites.txt') as f:
  for line in f:

    url = line.rstrip("\n")
    url = url.rstrip("\r")
    cmd = "{}bin/phantomjs --cookies-file={}cookieFiles/cookies-{}.txt {}examples/phantomRaider.js http://{}".format(pwd,pwd, url, pwd, url)
    os.system(cmd)
