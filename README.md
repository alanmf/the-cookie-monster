# the-cookie-monster

The cookie monster is a set of services intended to help large scale data analysis and mining of cookies on the internet. It utilizes Spark, Hadoop, Finagle/Finch, ReactJS, and PhantomJS. It is comprised of three components:

1. **Server** - an API for reporting on the data set. Utilizes Spark to read HDFS and RabbitMQ to send messages to gather new data sets.
2. **Phantom Raider** - Scripts that run PhantomJS to gather cookies from the web. Currently in the folder is a list of the top million (or so) internet sites, and previously collected cookie data.
3. **Web Client** - A reactJS web client that consumes the API and displays data in a user interface. Utilizes React Bootstrap.

## Server

The server is the core of the system. It runs Spark to query HDFS and return results on the cookie set, it runs an API using https://github.com/finagle/finch . Currently, HDFS is running locally; the data it is querying is located at the root of the project, https://github.com/alanmf/the-cookie-monster/blob/master/browserCookies.txt

####Running queries in the console:

You should be able to run the console of the API if you add the browserCookies.txt file to hadoop, and change the reference here if need be: https://github.com/alanmf/the-cookie-monster/blob/master/server/src/main/scala/cookie/monster/Spark.scala#L19

There are currently 3 separate queries: 
#####1. mostCommonUrlHost() -   Return the URL of the host domain that is responsible for setting the most cookies.
https://github.com/alanmf/the-cookie-monster/blob/master/server/src/main/scala/cookie/monster/Spark.scala#L39-L43
```
scala> val x = cookie.monster.SparkReporting.mostCommonUrlHost
...
x: Option[String] = Some(www.facebook.com)
```

#####2. pagesWithMostCookies() -   Get the pages that are setting the most cookies.
https://github.com/alanmf/the-cookie-monster/blob/master/server/src/main/scala/cookie/monster/Spark.scala#L62-L69
```
  scala> val x = cookie.monster.SparkReporting.pagesWithMostCookies
  ...
  x: Seq[(String, Int)] = 
  WrappedArray(
  (http://usuncut.com,96),
  (http://wnd.com,87),
  (http://wnd.com,85),
  (http://photobucket.com,85),
  (http://qpolitical.com,85),
  (http://readysethealth.com,85),
  (http://theblaze.com,85)
  )
```

#####2. cookieKeysWithValues(sampleSize: Int) -     Return a random sample of keys with their grouped values.
https://github.com/alanmf/the-cookie-monster/blob/master/server/src/main/scala/cookie/monster/Spark.scala#L87-L95
```
  scala> val x = cookie.monster.SparkReporting.cookieKeysWithValues(5)
  ...
  x: Seq[(String, Iterable[String])] =
  WrappedArray(
    ("mapp",CompactBuffer(0)),
    (" HttpOnly_mkra_ctxt",CompactBuffer(ac7bccdbc00ca477b1cf8b061b618f01--200)),
    (" HttpOnlyW2A",CompactBuffer(!HUQWu94cV0pavwFLTQ+Tjs7s3Sheluk2E8lYgeb7YGLFKwk/WAyKF9vflv+ypVwUJ6+uk61cPEdSXQ)),
    (visid_incap_851464,CompactBuffer(Wwk2EWA2TjGjTPPKE+8mbc7FzVcAAAAAQUIPAAAAAADSPOloT3zk80jAxGCrARff)),
    (_access_token,CompactBuffer(, , , , , , , ))
  )
```

####TODO:
1. Dynamic HDFS file usage
2. More functions for analysis, specifically regarding advertising and analytics tags that are setting cookies.
3. Authentication

## Phantom Raider

Phantom raider is a set of scripts running on PhantomJS that collect cookie data from the web. Currently this section of the repo holds pre-collected data (along with the scripts of course).

Right now, there is a text file containing the top million (or so) sites on the internet, from which we can do a 'pseudo' crawl by using readFile.py.

phantomRaider.js is run with phantomjs, in the following manner (make sure you have phantomjs installed and use the correct path to the binary.

The following command will run phantomRaider against one site:
```bin/phantomjs --cookies-file=cookieFileName.txt phantomRaider.js http://www.adobe.com```

To run on multiple sites, modify the `pwd` variable in readFile.py, and then run:
```python readFile.py```

####TODO:
1. Crawling functionality
2. Ability to digest RabbitMQ messages
3. Combine cookie files and fix output (separate lines for each cookie).



## Web Client

The web client is the beginnings of a simple interface to use the queries outside of the SBT console.

To run, use the following steps:

### Install Node modules:

### We are currently using the react modules, babelify, and browserify.

#### Install the modules
```npm install```

#### There are scripts defined in the package json to build the application's javascript.
```npm run-script build```
```npm run-script watch```

## Serving the application

###For now, we use a simple local Python server, taken from the React tutorial.

####Install dependencies defined in requirements.txt:
```pip install -r requirements.txt```

####Run the server:
```python server.py```


