resolvers += "Flyway" at "https://flywaydb.org/repo"


addSbtPlugin("org.flywaydb" % "flyway-sbt" % "4.0.3")

addSbtPlugin("io.spray" % "sbt-revolver" % "0.8.0")

addSbtPlugin("net.virtual-void" % "sbt-dependency-graph" % "0.8.2")

addSbtPlugin("com.github.tototoshi" % "sbt-slick-codegen" % "1.2.0")

libraryDependencies += "org.postgresql" % "postgresql" % "9.4.1209"
