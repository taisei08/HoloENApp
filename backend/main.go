package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()
    router.LoadHTMLGlob("templates/*.html")

    router.GET("/", func(c *gin.Context){
        c.HTML(200, "index.html", gin.H{})
    })

    router.Run()
}
