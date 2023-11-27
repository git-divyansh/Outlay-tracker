import React from 'react'
import styled from 'styled-components'

function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled style={{
            background: (bg || '#fcf6f9c7'),
            padding: bPad,
            borderRadius: bRad,
            color: color,
        }} onClick={onClick}>
            {name !== 'trash' && name !== 'logout' ? <span>{name}</span> : null}
            {icon}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
    span{
        margin-right: auto;
    }
`;


export default Button