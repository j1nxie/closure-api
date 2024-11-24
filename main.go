package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/j1nxie/closure-api/v2/routes"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	addr := os.Getenv("SERVER_ADDRESS")
	var port string

	if port = os.Getenv("SERVER_PORT"); port == "" {
		port = "3333"
	} else {
		port = os.Getenv("SERVER_PORT")
	}

	listenAddr := fmt.Sprintf("%v:%v", addr, port)

	log.Printf("closure listening on %v", listenAddr)

	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/api/status", routes.GetStatus)
	r.Get("/api/event", routes.GetEvent)

	if err := http.ListenAndServe(listenAddr, r); err != nil {
		log.Fatal(err)
	}
}
