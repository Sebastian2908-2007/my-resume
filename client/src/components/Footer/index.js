import { Toe } from "../styles/Footer.styled";
import { BasicDiv } from "../styles/Divs.styled";
import BasicBreadcrumbs from "../MUI/BasicBreadCrumbs";

const Footer = () => {
    return(
        <Toe>
            <BasicDiv> &copy; TopDev {new Date().getFullYear()}</BasicDiv>
            <BasicDiv><BasicBreadcrumbs/></BasicDiv>
        </Toe>
    );
};

export default Footer;