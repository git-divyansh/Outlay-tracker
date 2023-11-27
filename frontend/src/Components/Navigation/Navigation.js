import React, { useEffect } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { logout} from '../../Utils/Icons'
import { menuItems } from '../../Utils/menuItems'
import { useGlobalContext } from '../../Context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import Button from '../Button/Button'


const Navigation = ({active, setActive}) => {
    const {user, setError, setUser, name} = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() =>{
        if(!user){
            localStorage.removeItem("userid");
            localStorage.removeItem("username");
            Cookies.remove('jwt', {secure : true})
            setError('');
            navigate("/login");
        }
    // eslint-disable-next-line
    }, [user])

    const handleClick = () =>{
        setUser(false);
    }

  return (
    <NavStyled>
        <div className="user-con">
            <img src={avatar} alt="" />
            <div className="text">
                <h2>{name}</h2>
                <p>Your Money</p>
            </div>
        </div>
        <ul className="menu-items">
            {menuItems.map((item) => {
                return <li
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={active === item.id ? 'active': ''}
                >
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            })}
        </ul>
        <div className="bottom-nav">
            <Button 
                name={'logout'} 
                icon={logout}    
                background = {'white'}
                onClick={handleClick}
            />        
        </div>
    </NavStyled>
  )
}

const NavStyled = styled.div`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, .6);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(152, 148, 148, 0.6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(152, 148, 148, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: #19194b99 !important;
        i{
            color: #19194b99 !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav{
        margin-left: 1rem;
        width: 2rem;
        
    }
`



export default Navigation