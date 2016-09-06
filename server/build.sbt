import slick.codegen.SourceCodeGenerator
import slick.{model => m}

scalaVersion := "2.11.8"

resolvers ++= Seq(
  "SpinGo OSS" at "http://spingo-oss.s3.amazonaws.com/repositories/releases"
)

val opRabbitVersion = "1.2.1"
val jacksonVersion = "2.6.5"

libraryDependencies ++= Seq(
  "com.typesafe.slick" %% "slick" % "3.1.1",
  "com.github.finagle" %% "finch-core" % "0.11.0-M2",
  "com.github.finagle" %% "finch-circe" % "0.11.0-M2",
  "io.circe" %% "circe-generic" % "0.5.0-M2",
  "com.spingo" %% "op-rabbit-core" % opRabbitVersion,
  "com.spingo" %% "op-rabbit-play-json" % opRabbitVersion,
  "org.apache.spark" %% "spark-core" % "2.0.0",
  "com.fasterxml.jackson.core" % "jackson-core" % jacksonVersion,
  "com.fasterxml.jackson.core" % "jackson-annotations" % jacksonVersion,
  "com.fasterxml.jackson.core" % "jackson-databind" % jacksonVersion,
  "com.fasterxml.jackson.module" % "jackson-module-paranamer" % jacksonVersion,
  "com.netaporter" %% "scala-uri" % "0.4.14"
)
