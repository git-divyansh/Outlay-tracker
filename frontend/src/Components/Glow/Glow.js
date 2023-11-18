import React from 'react'
import styled, { keyframes }  from 'styled-components'
import { useWindowSize } from '../../Utils/useWindowSize'

const Glow = () => {

    const {width, height} = useWindowSize()

    // console.log(width, height)

    const moveGlow = keyframes`
        0%{
            transform: translate(0, 0);
        }
        50%{
            transform: translate(${width}px, ${height/2}px);
        }
        100%{
            transform: translate(0, 0);
        }
    `

    const GlowStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(400px);
        animation: ${moveGlow} 15s alternate linear infinite;
    `

    return (
        <GlowStyled>Glow</GlowStyled>
    )
}

export default Glow