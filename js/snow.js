window.onload = function() {
    var self = null;
    var Snow = function() {
        self = this;
        this.cnv = document.getElementById('snow');
        this.ctx = this.cnv.getContext('2d');
        this.particles = [];
        this.totalParticles = 70;
        this.angle = 0;
        this.pause = false;
        this.rand = function(min, max) {
            return ((Math.random() * (max - min)) + min);
        };
        this.particle = function() {
            this.x = self.rand(0, self.cnv.width);
            this.y = -10;
            this.r = self.rand(1, 5);
            this.angleX = self.rand(0, 5);
            this.angleY = self.rand(0, 5);
        };
        this.updateParticle = function() {
            for (var i = 0; i < this.particles.length; i++) {
                var p = this.particles[i];
                p.angleX += 0.1;
                p.x += Math.sin(p.angleX) * 0.5;
                p.y += Math.cos(p.angleY) + p.r;

                if (p.x > this.cnv.width || p.y > this.cnv.height) {
                    this.particles.remove(i);
                    this.particles.push(new this.particle());
                }
            }
        };
        this.init = function() {
            for (var i = 0; i < this.totalParticles; i++) {
                this.particles.push(new this.particle());
            }
            this.loop();
        };
        this.draw = function() {
            this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
            this.ctx.save();
            this.ctx.fillStyle = "rgba(234, 345, 123, 0)";
            this.ctx.beginPath();
            this.ctx.arc((this.cnv.width / 2), (this.cnv.height / 2) - 12, (this.cnv.width / 2), 0, 2 * Math.PI, true);
            this.ctx.fill();

            this.ctx.clip();
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            this.ctx.beginPath();
            for (var i = 0; i < this.particles.length; i++) {
                var p = this.particles[i];
                this.ctx.moveTo(p.x, p.y);
                this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }
            this.updateParticle();
            this.ctx.fill();

            this.ctx.restore();
        };
        this.loop = function() {
            self.draw();
            !self.pause ? window.requestAnimFrame(self.loop) : 0;
        };
        this.stop = function() {
            this.pause = true;
        };
    };

    var app = new Snow();
    app.init();
};

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

Array.prototype.remove = function(from, to) {
    from = Math.abs(from);
    to = Math.abs(to);
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};