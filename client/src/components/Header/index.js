import {Head, Nav} from '../styles/Header.styled';
import BasicMenu from '../MUI/BasicMenu';
import { BasicDiv } from '../styles/Divs.styled';

const Header = () => {
    return (
    <Head>
        <BasicDiv>TopDev</BasicDiv>
        <Nav>
            <BasicMenu/>
        </Nav>
    </Head>
    );
};

export default Header;
