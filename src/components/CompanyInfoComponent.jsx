import CompanyForm from "./CompanyForm";
import TopMenuCompanyInfo from "./TopMenuCompanyInfo";

export default function CompanyInfoComponent() {
  return (
    <div className="w-full">
      <TopMenuCompanyInfo />
      <div className="mt-4 ml-4 mr-4">
        <CompanyForm />
      </div>
    </div>
  );
}
