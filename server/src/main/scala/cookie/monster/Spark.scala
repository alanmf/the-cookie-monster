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

  def mostCommonUrlHost(): Option[String] = {
    result.map { r =>
      Uri.parse(r.url).host
    }.countByValue().maxBy(_._2)._1
  }

  def sitesWithMostCookies() {

  }

  def hostsSettingMostCookies() {
    
  }

  //Return a random sample of keys with their grouped values.
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

