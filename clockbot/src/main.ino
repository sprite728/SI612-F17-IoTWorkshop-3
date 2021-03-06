#include "Adafruit_mfGFX.h"
#include "Adafruit_ST7735.h"

#define CS A2
#define RST D0
#define DC D1

Adafruit_ST7735 display = Adafruit_ST7735(CS, DC, RST);
int BlackColor = display.Color565(0, 0, 0);
#define COLOR_CYAN 0x4F3F

void setup() {
  Serial.begin(9600); //ADD THIS LINE
  display.initR(INITR_GREENTAB);
  Particle.function("face", setFace);
}

int setFace(String face) {
  if(face == "idle") {
    drawIdleFace();
  } else if (face == "misch") {
    drawMischievousFace();
  } else if (face == "happy"){
    drawHappyFace();
  } else if (face == "rain") {
    drawRainFace();
  } else {
    drawIdleFace();
  }
}

void loop() {

}

void drawIdleFace() {
  display.fillScreen(BlackColor);
  display.fillRoundRect(20, 30, 40, 10, 2, COLOR_CYAN);
  display.fillRoundRect(70, 30, 40, 10, 2, COLOR_CYAN);
}

void drawMischievousFace() {
  display.fillScreen(BlackColor);
  display.fillRoundRect(20, 30, 40, 45, 5, COLOR_CYAN);
  display.fillRoundRect(70, 40, 40, 30, 5, COLOR_CYAN);
}

void drawHappyFace() {
  display.fillScreen(BlackColor);
  display.fillRoundRect(18, 30, 40, 20, 8, COLOR_CYAN);
  display.fillRoundRect(67, 30, 40, 20, 8, COLOR_CYAN);
  display.fillCircle(38, 59, 23, BlackColor);
  display.fillCircle(87, 59, 23, BlackColor);
}

void drawRainFace() {
  // Design your own rainning face ...
  display.fillScreen(BlackColor);
  display.setCursor(5, 5);
  display.setTextSize(1);
  display.print("It's rainning!");
}
