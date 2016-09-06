package cookie.monster

import com.spingo.op_rabbit._
import com.spingo.op_rabbit.PlayJsonSupport._
import play.api.libs.json._
import akka.actor.{ActorSystem, Props}
import scala.concurrent.ExecutionContext.Implicits.global

case class Site(url: String, limit: Int)

object SiteRequester {
  implicit val siteFormat = Json.format[Site]
	implicit val actorSystem = ActorSystem("system")

	val rabbitControl = actorSystem.actorOf(Props[RabbitControl])

  def publishSite(url: String) {
    rabbitControl ! Message.queue(
      Site(url = url, limit = 100),
      queue = "phantom-raider"
    )
  }
  
}
