package cookie.monster

import org.apache.spark.SparkConf
import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import com.fasterxml.jackson.module.scala.experimental.ScalaObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.netaporter.uri.dsl._
import com.netaporter.uri.Uri

case class CookieData(startedDateTime: String, url: String, responseCookies: String, pageref: String)

object SparkReporting {
  val conf = new SparkConf().setMaster("local").setAppName("cookieMonster")
  val sc = new SparkContext(conf)

  val textFile = sc.textFile("hdfs://localhost:9000/data/cookiemonster/browserCookies.txt")
  val mapper = new ObjectMapper()
  mapper.registerModule(DefaultScalaModule)

  val result = textFile.flatMap(record => {
    try {
      Some(mapper.readValue(record, classOf[CookieData]))
    } catch {
      case e: Exception => None
    }
  })

  /*
  Return the URL of the host domain that is responsible for setting the most cookies.

  Sample call:

  scala> val x = cookie.monster.SparkReporting.mostCommonUrlHost
  x: Option[String] = Some(www.facebook.com)
  */
  def mostCommonUrlHost(): Option[String] = {
    result.map { r =>
      Uri.parse(r.url).host
    }.countByValue().maxBy(_._2)._1
  }

  /*
  Get the pages that are setting the most cookies.

  Sample call:

  scala> val x = cookie.monster.SparkReporting.pagesWithMostCookies
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
  */
  def pagesWithMostCookies(): Seq[(String, Int)] = {
    result.map { r => 
      (
        r.pageref, 
        r.responseCookies.split(";").size
      )
    }.takeOrdered(10)(Ordering[Int].reverse.on{x => x._2 }).toSeq
  }

  /* 
  Return a random sample of keys with their grouped values.

  Sample return:

  scala> val x = cookie.monster.SparkReporting.cookieKeysWithValues(5)

  x: Seq[(String, Iterable[String])] =
  WrappedArray(
    ("mapp",CompactBuffer(0)),
    (" HttpOnly_mkra_ctxt",CompactBuffer(ac7bccdbc00ca477b1cf8b061b618f01--200)),
    (" HttpOnlyW2A",CompactBuffer(!HUQWu94cV0pavwFLTQ+Tjs7s3Sheluk2E8lYgeb7YGLFKwk/WAyKF9vflv+ypVwUJ6+uk61cPEdSXQ)),
    (visid_incap_851464,CompactBuffer(Wwk2EWA2TjGjTPPKE+8mbc7FzVcAAAAAQUIPAAAAAADSPOloT3zk80jAxGCrARff)),
    (_access_token,CompactBuffer(, , , , , , , ))
  )
  */
  def cookieKeysWithValues(sampleSize: Int): Seq[(String, Iterable[String])] = {
    result.flatMap { r =>
      val pairs = r.responseCookies.split(";")
      pairs.map { p =>
        val splitPair = p.split("=")
        (splitPair.head, splitPair.tail.mkString(" "))
      }
    }.groupByKey.takeSample(true, sampleSize)
  }
}

