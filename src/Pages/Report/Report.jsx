import React from "react";
import "./Report.css"; // Optional CSS

const reports = [
  {
    title: "ASN Annual Report 2020",
    link: "https://aasamannepal.org.np/wp-content/uploads/2022/03/asn-annual-report-2020.pdf",
    image:
      "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
  },
  {
    title: "ASN Annual Report 2016",
    link: "https://aasamannepal.org.np/wp-content/uploads/2021/04/asn-annual-report-2016.pdf",
    image:
      "https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2021%2F08%2F31%2Fbooks-istock-1023499-1629912600-1025292-1630356943.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2",
  },
  {
    title: "ASN Education - TES Analysis",
    link: "https://www.tes.com/magazine/analysis/specialist-sector/how-asn-education-shows-way-forward-all-schools",
    image:
      "https://teachonline.ca/sites/default/files/1140x400-mustreadbooks-.jpg",
  },
  {
    title: "Beyond the Label: ASN Education",
    link: "https://annemscriven.com/beyond-the-label-encountering-asn-education/",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUklEoy15HyfQtZMzmhvquShZkC4Ss90iJBhgDFBa1X75HBxJA3RtDN_tCTv5WdVkQ9A&usqp=CAU",
  },
  {
    title: "Book Store System - ResearchGate",
    link: "https://www.researchgate.net/publication/380729587_ONLINE_BOOK_STORE_MANAGEMENT_SYSTEM_PROJECT_REPORT",
    image: "https://tinyurl.com/dpjajjuu",
  },
  {
    title: "Book Store System - Studocu",
    link: "https://www.studocu.com/row/document/tribhuvan-university/computer-application/online-book-store/83058660",
    image: "https://tinyurl.com/bp54u2hk",
  },
];

const ReportsPage = () => {
  return (
    <div className="reports-page">
      <h2 className="reports-title">Reports & Publications</h2>
      <div className="reports-grid">
        {reports.map((report, index) => (
          <a
            key={index}
            href={report.link}
            target="_blank"
            rel="noopener noreferrer"
            className="report-card"
          >
            <img src={report.image} alt={report.title} className="report-img" />
            <h3 className="report-title">{report.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
