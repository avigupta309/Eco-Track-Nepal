import { useState } from 'react';
import { Report } from './types';
import { mockReports } from './mockData';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ReportsList from './pages/ReportsList';
import ReportForm from './components/ReportForm';
import ReportDetail from './components/ReportDetail';

type Page = 'login' | 'signup' | 'dashboard' | 'reports';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('reports');
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    setSelectedReport(null);
  };

  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handleCloseReportDetail = () => {
    setSelectedReport(null);
  };

  const handleSubmitReport = (data: any) => {
    const newReport: Report = {
      id: String(reports.length + 1),
      category: data.category,
      description: data.description,
      photos: data.photos.length > 0 ? data.photos : ['https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=800'],
      province: data.province,
      district: data.district,
      address: data.address,
      location: data.location,
      date: new Date().toISOString().split('T')[0],
      reporter: {
        name: 'Current User',
        email: 'user@example.com'
      }
    };
    setReports([...reports, newReport]);
    setShowReportForm(false);
  };

  return (
    <>
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignupPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && (
        <Dashboard
          reports={reports}
          onNavigate={handleNavigate}
          onSelectReport={handleSelectReport}
          onOpenReportForm={() => setShowReportForm(true)}
        />
      )}
      {currentPage === 'reports' && (
        <ReportsList
          reports={reports}
          onNavigate={handleNavigate}
          onSelectReport={handleSelectReport}
        />
      )}

      {showReportForm && (
        <ReportForm
          onClose={() => setShowReportForm(false)}
          onSubmit={handleSubmitReport}
        />
      )}

      {selectedReport && (
        <ReportDetail
          report={selectedReport}
          onClose={handleCloseReportDetail}
        />
      )}
    </>
  );
}

export default App;
