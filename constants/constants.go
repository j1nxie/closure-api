package constants

import (
	"log"
	"runtime/debug"
)

// TODO: get pretty version name from build info

var RomanticJam = [10]string{
	"Sunset Tea Cup",
	"macaron moon",
	"Cinnamon Symphony",
	"Bye Bye",
	"Ghost Town",
	"Lifeline",
	"Cappuccino",
	"Cinderella Syndrome",
	"outro-duck-tion!!",
	"Summer Night Hiking",
}

func GetVersion() string {
	buildInfo, ok := debug.ReadBuildInfo()

	if !ok {
		log.Fatal("failed to read build info")
	}

	version := buildInfo.Main.Version

	return version
}
