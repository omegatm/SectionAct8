class title extends Phaser.Scene {
    constructor() {
        super('title')
        
    };
    init() {
        let pixelin = this.cameras.main.postFX.addPixelate(30);
        this.add.tween({targets: pixelin, duration: 800, amount: -1});
    }
    preload(){
        this.load.image('bug', './assets/bug.png');
        this.load.image('fairy', './assets/fairy.png');
        this.load.image('snail', './assets/snail.png');
        
    }
    create() {
        
        //title
        this.add.text(game.config.width*.5, game.config.height*.1, "Roly Poly: To the End", {font: "120px Verdana"}).setOrigin(0.5);

        //button
        let button = this.add.rectangle(game.config.width*.5,game.config.height*.8,400,300,0xa4c2f4).setInteractive();
        let buttontext = this.add.text(game.config.width*.5,game.config.height*.8, "Play", {font: "80px Verdana"}).setOrigin(0.5);

        //images
        let bug = this.add.image(-500, 400, 'bug');
        let snail = this.add.image(-1000, 400, 'snail');
        let fairy1 = this.add.image(150, 1080-150, 'fairy');
        let fairy2 = this.add.image(1920-150, 1080-150, 'fairy');

        bug.flipX=true;
        fairy2.flipX = true;
        fairy1.scale = fairy2.scale = .5;


        this.tweens.add({
            targets: [bug],
            x: 2500,
            flipX: true,
            yoyo: true,
            duration: 2500,
            repeat: -1
        });

        this.tweens.add({
            targets: [snail],
            x: 2000,
            flipX: true,
            yoyo: true,
            duration: 2500,
            repeat: -1
        });

        
        
        this.add.tween({
            targets: [fairy1, fairy2],
            angle: 360,
            repeat: -1,
            repeatDelay: 500
        })

        // button interaction to start scene transition
        button.on('pointerover',()=>{
            button.scale +=.75;
        })
        button.on('pointerout',()=> {
            button.scale -=.75;
        })

        let pixelout = this.cameras.main.postFX.addPixelate(-1);
        button.on('pointerdown', () => {
            this.add.tween({targets: pixelout, duration: 800, amount: 30, onComplete: () => {
                this.cameras.main.fadeOut(100);
                this.scene.start('level');
            }})
        })
    }
}
//level by Joseph Verespey
class level extends Phaser.Scene{

    constructor(){
        super('level')
        let ball=null;
        let flag=null;
    }
    init() {
        let pixelin = this.cameras.main.postFX.addPixelate(30);
        this.add.tween({targets: pixelin, duration: 800, amount: -1});
    }
    preload(){
        this.load.image('flag', './assets/flag1.png');
        this.load.image('ball', './assets/bug.png');
        this.load.atlas('sheet', './assets/Floors.png', 'assets/Floors.json');
        this.load.json('shapes','./assets/Floor.json');
    }
    create() {
    //     const timer=this.time.addEvent({
    //         delay:5000,
    //         callback:this.scene.start('level'),
    //         callbackScope:this
    //     });
    //     let sampletext= this.add.text(1300,300,'', { fontFamily: 'Arial', fontSize: '24px', color: '#000000' });
    // this.time.addEvent({
    //     delay:100,
    //     callback:()=>{
    //         const remainingtime= timer.getRemaingSeconds();
    //         text.setText('Time:${remainingtime.toFixed(1)}s')
    //     },
    //     callbackScope:this,
    //     loop:true
    // });
        let shapes=this.cache.json.get("shapes");
        this.add.text(this.game.config.width * 0.4, this.game.config.height * 0.3, "Flick The Roly Poly with the Mouse to reach the goal!").setColor('#00ff00').setFontSize(30);
        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.flag=this.matter.add.sprite(this.game.config.width*.8, this.game.config.height*.4, 'flag').setOrigin(.5,.5).setStatic(true);
        this.ball=this.matter.add.image(this.game.config.width*.1, this.game.config.height*.8, 'ball').setScale(.4).setFlipX(true);
        this.ball.setBody({
            type:'circle',
            radius:40
        });
        this.ball.setBounce(.5);
        this.ball.setInteractive();
        this.ball.setFrictionAir(0.01); 
        this.input.setDraggable(this.ball);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {});



        this.input.on('dragend', (pointer, gameObject) => {
            const velocityX = pointer.velocity.x * .1; 
            const velocityY = pointer.velocity.y * .1; 

            gameObject.setVelocity(velocityX, velocityY);
        });
        // let groundX = this.sys.game.config.width / 2-315;
        // let groundY = this.sys.game.config.height * 0.5;
        // let ground = this.matter.add.sprite(groundX, groundY,'sheet', 'floor2.png',{shape:shapes.floor2});
        
        
        // ground.displayWidth = this.sys.game.config.width;

    
            
        //ground.setStatic(true);

    
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                if (
                (pair.bodyA === this.ball.body && pair.bodyB === this.flag.body) ||
                (pair.bodyA === this.flag.body && pair.bodyB === this.ball.body)
                ) {
                    let pixelout = this.cameras.main.postFX.addPixelate(-1);
                    this.scene.start('end');
                
                }
            });
        });
           
        
        
        
    }
    update()
    { 
       

    }
            
           
        
    }

class end extends Phaser.Scene {
    constructor() {
        super('end');
    };
    init() {
        let pixelin = this.cameras.main.postFX.addPixelate(30);
        this.add.tween({targets: pixelin, duration: 800, amount: -1});
    }
    preload(){
        this.load.image('bug', './assets/bug.png');
        
    }
    create() {
        //title
        this.add.text(game.config.width*.5, game.config.height*.1, "YOU WIN!!!", {font: "120px Verdana", color: "#FFF929"}).setOrigin(0.5);

        //bug and badge
        let bug = this.add.image(500, 500, 'bug');
        bug.flipX= true;
        let circle = this.add.circle(1000, game.config.height*.5, 300);

        //bug moves towards badge
        this.add.tween({
            targets: bug,
            x: 1000,
            duration: 1600
        })


        //title
        this.add.text(game.config.width*.5, game.config.height*.9, "Click to restart", {font: "80px Verdana"}).setOrigin(0.5);

        let pixelout = this.cameras.main.postFX.addPixelate(-1);
        this.input.once('pointerdown', () => {
            this.add.tween({targets: pixelout, duration: 800, amount: 30, onComplete: () => {
                this.cameras.main.fadeOut(100);
                this.scene.start('title');
            }})
        });
    }
}

let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics:{
        default:'matter',
        matter:{
            gravity:{
               y:.9
            },
            debug:true
        }
    },
    scene: [title, level, end],
}

let game = new Phaser.Game(config);