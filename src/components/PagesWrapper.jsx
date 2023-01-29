import StartInfoComponent from "./StartInfoComponent";
import CompanyInfoComponent from "./CompanyInfoComponent";
import NewInvoiceComponent from "./NewInvoiceComponent";

export default function PagesWrapper({selectedForm}) {
    if (selectedForm == 0) {
        return <StartInfoComponent/>
    } else if (selectedForm == 1) {
        return <CompanyInfoComponent/>
    } else if (selectedForm == 2) {
        return <NewInvoiceComponent/>
    }
}