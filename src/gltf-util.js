// eslint-disable-next-line no-unused-vars
function transformGLTFChildren(layer, transform, children) {
    const obj = layer.implementation.scene;
    if (children === [] || !children) {
        for (let i = 0; i < obj.children[0].children.length; i++) {
            if(transform.location) {
                obj.position.set(transform.location.x, transform.location.y, transform.location.z);
            }
            if(transform.scale) {
                obj.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
            }
            if(transform.rotation) {
                obj.rotateX(transform.rotation.x);
                obj.rotateY(transform.rotation.y);
                obj.rotateZ(transform.rotation.z);
            }
        }
        return;
    }
    for (let i = 0; i < obj.children[0].children.length; i++) {
        for (let j = 0; j < children.length; j++) {
            if(transform.location && obj.children[0].children[i].name === children[j]) {
                obj.children[0].children[i].position.set(transform.location.x, transform.location.y, transform.location.z);
            }
            if(transform.scale && obj.children[0].children[i].name === children[j]) {
                obj.children[0].children[i].scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
            }
            if(transform.rotation && obj.children[0].children[i].name === children[j]) {
                obj.children[0].children[i].rotateX(transform.rotation.x);
                obj.children[0].children[i].rotateY(transform.rotation.y);
                obj.children[0].children[i].rotateZ(transform.rotation.z);
            }
        }
    }
    return;

}

// eslint-disable-next-line no-unused-vars
function setCameraFrom3DtoMapbox(anchor, cameraTransform) {
    const transform = cameraPramFrom3DtoMapbox(anchor, cameraTransform);
    // eslint-disable-next-line no-undef
    const options = map.getFreeCameraOptions();
    options.position = transform.position;
    options.setPitchBearing(transform.pitch, transform.bearing);
    // eslint-disable-next-line no-undef
    map.setFreeCameraOptions(options);
}

function cameraPramFrom3DtoMapbox(anchor, camera) {
    // eslint-disable-next-line no-undef
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(new mapboxgl.LngLat(anchor[0], anchor[1]), camera.location.z);
    const scale = modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();
    return {
        position: {
            x: modelAsMercatorCoordinate.x + camera.location.x * scale,
            y: modelAsMercatorCoordinate.y - camera.location.y * scale,
            z: modelAsMercatorCoordinate.z
        },
        pitch: camera.rotation.x,
        bearing: camera.rotation.z
    }
}
