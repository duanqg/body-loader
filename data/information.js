// @flow
// eslint-disable-next-line no-unused-vars
const geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [116.3184590395457, 39.99934061384263],
        },
        properties:{
            name: 'exm',
            title: '二校门',
            anchor: [116.3184590395457, 39.99934061384263],
            camera: [
                {
                    name: 'exm_camera_1',
                    location: {
                        x: -33.4557,
                        y: -245.805,
                        z: 16.558
                    },
                    rotation : {
                        x: 85,
                        y: 0,
                        z: -1.37, //z要变个符号
                    },
                }
            ],
            pose: [
                {
                    name: 'exm_pose_1',
                    scale: { //不变
                        x: 1.6046048402786255,
                        y: 1.6046048402786255,
                        z: 1.6046048402786255
                    },
                    location: { //不变
                        x: -41.41874694824219,
                        y: 3.2327921390533447,
                        z: 216.244873046875
                    },
                    rotation: { //弧度制
                        x: 0.01805595471065694,
                        y: 0.03977744991635236, //y相当于z
                        z: -0.40607703041526066 //z相当于y
                    }
                },
            ]
        },
    }, {
        type: 'Feature',
        geometry: {
            'type': 'Point',
            'coordinates': [116.3180508767075, 40.000583936572944],
        },
        properties:{
            name: 'ej',
            title: '二教',
            anchor: [116.3184590395457, 39.99934061384263],
            camera: [
                {
                    name: 'ej_camera_1',
                    location: {
                        x: -17.5916,
                        y: -21.5347,
                        z: 8.62164
                    },
                    rotation : {
                        x: 88,
                        y: 0,
                        z: -89.4249,
                    },
                }
            ],
            pose: [
                {
                    name: 'ej_pose_1',
                    rotation: {
                        x: 0,
                        y: 1.3863848380291757,
                        z: 0
                    },
                    location: {
                        x: -62.24801254272461,
                        y: -0.13904953002929688,
                        z: 17.489887237548828
                    }
                },
            ]
        }
    }, {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [116.32004964096525, 40.000609966562955],
        },
        properties:{
            name: 'qhxt',
            title: '清华学堂',
            anchor: [116.3184590395457, 39.99934061384263],
            camera: [
                {
                    name: 'qhxt_camera_1',
                    location: {
                        x: -48.626,
                        y: -96.606,
                        z: 16.697
                    },
                    rotation : {
                        x: 88,
                        y: 0,
                        z: 40,
                    }
                }
            ],
            pose: [
                {
                    name: 'qhxt_pose_1',
                    scale: {
                        x: 1.089632511138916,
                        y: 1.089632511138916,
                        z: 1.089632511138916
                    },
                    location: {
                        x: 17.148704528808594,
                        y: 0,
                        z: 29.393646240234375
                    },
                    rotation: {
                        x: 0,
                        y: -0.8069913769031222,
                        z: 0
                    }
                }
            ]
        }
    }]
};

// eslint-disable-next-line no-unused-vars
const customLayer = [
    {
        id: 'build',
        type : 'custom',
        mode: '3d',
        url:'./gltf/building/building.gltf',
        center: [116.3184590395457, 39.99934061384263],
        altitude: 0,
        minzoom: 16.5,
        maxzoom: 25,
        visible: true
    },
    {
        id: 'back',
        type : 'custom',
        mode: '3d',
        url:'./gltf/building/background.gltf',
        center: [116.3184590395457, 39.99934061384263],
        altitude: 0,
        minzoom: 16.5,
        maxzoom: 25,
        visible: true
    },
    {
        id: 'body',
        type : 'custom',
        mode: '3d',
        url:'./gltf/body-loader/body/body.gltf',
        center: [116.3184590395457, 39.99934061384263],
        altitude: 0,
        minzoom: 16.5,
        maxzoom: 25,
        visible: true,
    },
    {
        id: 'cloth',
        type : 'custom',
        mode: '3d',
        url:'./gltf/body-loader/cloth/xz.gltf',
        center: [116.3184590395457, 39.99934061384263],
        altitude: 0,
        minzoom: 16.5,
        maxzoom: 25,
        visible: true,
    },
    {
        id: 'hair',
        type : 'custom',
        mode: '3d',
        url:'./gltf/body-loader/hair/ct.gltf',
        center: [116.3184590395457, 39.99934061384263],
        altitude: 0,
        minzoom: 16.5,
        maxzoom: 25,
        visible: true,
    }
];
