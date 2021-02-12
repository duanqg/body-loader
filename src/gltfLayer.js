// @flow
class gltfLayer {
    constructor(info) {
        this.id = info.id;
        this.url = info.url;
        this.type = info.type;
        this.renderingMode = info.mode;
        this.modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(info.center, info.altitude);
        this.modelTransform = {
            translateX: this.modelAsMercatorCoordinate.x,
            translateY: this.modelAsMercatorCoordinate.y,
            translateZ: this.modelAsMercatorCoordinate.z,
            rotateX: Math.PI / 2,
            rotateY: 0,
            rotateZ: 0,
            scale: this.modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
        };
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        this.loader = new THREE.GLTFLoader();
        this.visible = info.visible;
        this.minzoom = info.minzoom;
        this.maxzoom = info.maxzoom;
        this.nodes = [];
    }
    onAdd (map, gl) {
        this.scene.visible = this.visible;
        this.loader.load(this.url, (gltf) => {
            this.nodes = gltf.parser.json.nodes;
            for (let i = 0; i < this.nodes.length; i++) {
                const prop = this.nodes[i].extensions;
                if(prop) {
                    if (prop.visible) {
                        gltf.scene.children[i].visible = this.nodes[i].extensions.visible;
                    }
                    else {
                        gltf.scene.children[i].visible = false;
                    }
                } else {
                    gltf.scene.children[i].visible = false;
                }

            }
            this.scene.add(gltf.scene);
        });
        this.map = map;
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });
        this.renderer.autoClear = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
    }
    render (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), this.modelTransform.rotateX);
        const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), this.modelTransform.rotateY);
        const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), this.modelTransform.rotateZ);

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4().makeTranslation(this.modelTransform.translateX, this.modelTransform.translateY, this.modelTransform.translateZ)
            .scale(new THREE.Vector3(this.modelTransform.scale, -this.modelTransform.scale, this.modelTransform.scale))
            .multiply(rotationX).multiply(rotationY).multiply(rotationZ);
        this.camera.projectionMatrix.elements = matrix;
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.zoomControl();
    }
    zoomControl() {
        if (this.visible) {
            // eslint-disable-next-line no-undef
            if (map.getZoom() >= this.minzoom && map.getZoom() <= this.maxzoom) {
                this.scene.visible = true;
            } else {
                this.scene.visible = false;
            }

        }
    }
}

function visibleGLTFChildren(layer, visible, children) {
    const obj = layer.implementation.scene;
    if (children === [] || !children) {
        for (let i = 0; i < obj.children[0].children.length; i++) {
            obj.children[0].children[i].visible = visible;
        }
        return;
    }
    let elseGltf = [];
    for (let i = 0; i < obj.children[0].children.length; i++) {
        elseGltf.push(obj.children[0].children[i].name);
        for (let j = 0; j < children.length; j++) {
            if (obj.children[0].children[i].name === children[j]) {
                obj.children[0].children[i].visible = visible;
                elseGltf = elseGltf.filter(function(item) {
                    return item != children[j];
                });
            }
        }
    }
    for (let i = 0; i < obj.children[0].children.length; i++) {
        for (let j = 0; j < elseGltf.length; j++) {
            if (obj.children[0].children[i].name === elseGltf) {
                obj.children[0].children[i].visible = !visible;
            }
        }
    }
    obj.visible = visible;
}

