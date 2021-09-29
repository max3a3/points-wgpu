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

    chromaticAberration(brightnessSensitivity = .5, distance = 1) {
        this._screen.currentLayer.points.forEach(p => {
            if (p.getBrightness() > brightnessSensitivity) {
                let nextPoint = this._screen.getNextPoint(p, distance);
                if (nextPoint) {
                    nextPoint.setColor((nextPoint.color.r + p.color.r) / 2, nextPoint.color.g, nextPoint.color.b, (nextPoint.color.a + p.color.a) / 2);
                }
                let prevPoint = this._screen.getPrevPoint(p, distance);
                if (prevPoint) {
                    prevPoint.setColor(prevPoint.color.r, prevPoint.color.g, (prevPoint.color.b + p.color.b) / 2, (prevPoint.color.a + p.color.a) / 2);
                }
            }
        });
    }

    soften() {
        this._screen.currentLayer.points.forEach(point => {

            if(point.modified){
                // TODO this can be done better in a circle, since the smalles circle is a square
                const topLeftPoint = this._screen.getTopLeftPoint(point);
                const topPoint = this._screen.getTopPoint(point);
                const topRightPoint = this._screen.getTopRightPoint(point);
    
                const leftPoint = this._screen.getPrevPoint(point);
                const rightPoint = this._screen.getNextPoint(point);
    
                const bottomLeftPoint = this._screen.getBottomLeftPoint(point);
                const bottomPoint = this._screen.getBottomPoint(point);
                const bottomRightPoint = this._screen.getBottomRightPoint(point);
    
                const points = [topLeftPoint, topPoint, topRightPoint, leftPoint, rightPoint, bottomLeftPoint, bottomPoint, bottomRightPoint];
                points.forEach(pointAround => {
                    if (pointAround ) {
                        //pointAround.color = point.color;
                        //pointAround.modified = true;
                        pointAround.setColor(
                            (point.color.r + pointAround.color.r*2)/3,
                            (point.color.g + pointAround.color.g*2)/3,
                            (point.color.b + pointAround.color.b*2)/3
                        );
                    }
                })
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