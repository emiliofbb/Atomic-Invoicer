import TopMenuCompanyInfo from "./TopMenuCompanyInfo";

export default function CompanyInfoComponent() {
    return(
        <div className="w-3/4">
            <TopMenuCompanyInfo/>
            <div className="mt-4 ml-8 mr-4">
                <h1 className="text-3xl font-semibold font-sans antialiased">
                    Company info window
                </h1>
            </div>
        </div>
    );
}