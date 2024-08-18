import { OrbitControls } from '@react-three/drei'
import { folder, button, useControls } from 'leva'

export default function Experience()
{
    const { spherePosition, sphereColor, visible } = useControls({
        spherePosition: {
            value: { x: -2, y: 0 }, // enabling the z value results in losing the joystick control
            min: -4,
            max: 4,
            step: 0.01,
            joystick: 'invertY' // this fixes the inverted Y axis while using the joystick so for example when dragging the joystick up, the default behaviour makes the object goes down and vice versa, this fixes the issue
        },
        sphereColor: '#ff0000', // alpha in these colors won't work because of how Three.js handles the colors
        visible: true,
        myInterval: {
            min: 0,
            max: 10,
            value: [ 4, 5 ]
        },
        clickMe: button(() => {
            alert('clicked')
        }),
        choice: { options: [ 'a', 'b', 'c' ] }
    });

    const { boxScale } = useControls('cube', {
        boxScale: {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        }
    })

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh visible={visible} position={ [ spherePosition.x, spherePosition.y, 0 ] }>
            <sphereGeometry />
            <meshStandardMaterial color={sphereColor} />
        </mesh>

        <mesh position-x={ 2 } scale={ boxScale }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}