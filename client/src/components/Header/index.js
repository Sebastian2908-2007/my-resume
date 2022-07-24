import {Head, Nav} from '../styles/Header.styled';
import BasicMenu from '../MUI/BasicMenu';

const Header = () => {
    return (
    <Head>
        This is header
        <Nav>
            <BasicMenu/>
        </Nav>
    </Head>
    );
};

export default Header;
