package cookie.monster

import com.twitter.finagle.Http
import com.twitter.finagle.Service
import com.twitter.finagle.http.{Request, Response}
import com.twitter.finagle.http.filter.Cors
import com.twitter.util.Await
import com.typesafe.config.ConfigFactory
import io.finch._
import io.finch.circe._
import io.circe.generic.auto._
import com.netaporter.uri.Uri

import SparkReporting._
import SiteRequester._

object Reporting {
  val sparkReporting = SparkReporting

  val mostCommonUrlHost: Endpoint[Option[String]] = 
    get("reporting" :: "most-common-url-host") { Ok(sparkReporting.mostCommonUrlHost) }

  val cookieKeysWithValues: Endpoint[Seq[(String, Iterable[String])]] = 
    get("reporting" :: "cookie-keys-with-values" :: param("samplesize").as[Int]) 
    { samplesize: Int => Ok(sparkReporting.cookieKeysWithValues(samplesize)) }

  val api = mostCommonUrlHost :+: cookieKeysWithValues
}

object DataCollection {
  val siteRequester = SiteRequester

  val scanSite: Endpoint[Unit] = 
    post("site" :: param("url").as[String]) { url: String => 
    val parsedUri = Uri.parse(url)
    Ok(siteRequester.publishSite(url))

  }
}

object Main extends App {
  val api = Reporting.api

  val policy: Cors.Policy = Cors.Policy(
    allowsOrigin = _ => Some("*"),
    allowsMethods = _ => Some(Seq("GET", "POST")),
    allowsHeaders = _ => Some(Seq("Accept"))
  )

  val corsService: Service[Request, Response] = new Cors.HttpFilter(policy).andThen(api.toService)

  Await.ready(Http.server.serve(":8081", corsService))
}
