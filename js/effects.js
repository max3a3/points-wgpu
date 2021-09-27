class Effects {
    constructor(screen) {
        this._screen = screen;
        this._rowCounter = 0;
    }

    fire(level = 1) {
        let amountNoise = 6000;
        for (let index = 0; index < amountNoise; index++) {
            let point = this._screen.getRandomPoint(); {
                if (point.modified) {
                    let yDisplace;
                    for (let indexLevel = 0; indexLevel <= level - 1; indexLevel++) {
                        yDisplace = indexLevel + 1;
                        this._screen.movePointTo(point, point.coordinates.x + indexLevel, point.coordinates.y - yDisplace);
                    }
                }
            }
        }
    }

    scanLine(level = 1) {
        for (let columIndex = 0; columIndex < this._screen.numColumns; columIndex++) {
            this._pointA = this._screen.getPointAt(columIndex, this._rowCounter);
            if (this._pointA) {
                for (let indexLevel = 0; indexLevel <= level; indexLevel++) {
                    this._screen.movePointTo(this._pointA, columIndex, this._rowCounter - indexLevel + 1);
                }
            }
        }

        if (++this._rowCounter >= this._screen.numRows) {
            this._rowCounter = 0;
        }
    }

    blackAndWhite() {
        let brightness;
        this._screen.currentLayer.points.forEach(point => {
            if (point.modified) {
                brightness = point.getBrightness();
                point.setBrightness(brightness);
            }
        });
    }

    blackAndWhitePointSize() {
        let brightness;
        this._screen.currentLayer.points.forEach(point => {
            if (point.modified) {
                brightness = point.getBrightness();
                point.size = brightness * this._screen.pointSizeFull;
                point.setBrightness(1);
            }
        });
    }

    chromaticAberration(brightnessSensitivity = .5) {
        this._screen.currentLayer.points.forEach(p => {
            if (p.getBrightness() > brightnessSensitivity) {
                let nextPoint = this._screen.getNextPoint(p);
                if (nextPoint) {
                    nextPoint.setColor((nextPoint.color.r + p.color.r) / 2, nextPoint.color.g, nextPoint.color.b);
                }
                let prevPoint = this._screen.getPrevPoint(p);
                if (prevPoint) {
                    prevPoint.setColor(prevPoint.color.r, prevPoint.color.g, (prevPoint.color.b + p.color.b) / 2);
                }
            }
        });
    }

    /**
     * A little color variation
     */
    tone1() {
        let brightness;
        this._screen.currentLayer.points.forEach(point => {
            if (point.modified) {
                brightness = point.getBrightness();
                point.setColor(brightness, point.color.g, point.color.g);
            } else {
                point.setBrightness(0);
            }
        });

    }

    tone2() {
        let brightness;
        this._screen.currentLayer.points.forEach(point => {
            if (point.modified) {
                brightness = point.getBrightness();
                point.setColor(brightness, point.color.b, point.color.b);
            } else {
                point.setBrightness(0);
            }
        });

    }
}

export default Effects;