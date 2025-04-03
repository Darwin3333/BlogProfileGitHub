import { Summary } from './components/Summary';
import { HomeContainer } from './styles';
import axios from 'axios';
import { Issue } from './components/Issue';
import { IssuesListStyle } from './components/Issue/styles';
import { useState, useEffect } from 'react';

export type IIssues = {
  id: number; //fica, todo componente precisa de uma key.
  title: string; //titulo da issue.
  body?: string; // alguns bodys estao vazios, preciso do '?'
  html_url: string; // vai ficar, vou usar para encaminhar para a pagina principal
  created_at: string; // data
  pull_request?: {}; //fica pois preciso para filtrar as tasks validas
  //author_association: string;  (nao necessito neste momento)
};

export function Home() {
  const [errorI, setErrorI] = useState(false);
  const [issues, setIssues] = useState<IIssues[]>();

  async function fetchIssues() {
    try {
      const issuesData = await axios.get(
        'https://api.github.com/repos/facebook/react/issues'
      );
      console.log(issuesData.data);
      const filteredIssues = issuesData.data.filter(
        (issue: IIssues) => !issue.pull_request
      );
      setIssues(filteredIssues);
      console.log(filteredIssues);
    } catch (error) {
      setErrorI(true);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchIssues();
    console.log(issues);
  }, []);

  return (
    <HomeContainer>
      <Summary />
      <IssuesListStyle>
        {issues &&
          issues.map((issue) => (
            <Issue
              key={issue.id}
              title={issue.title}
              body={issue.body || 'Nada para ver aqui.'} // Se for null, mostra um texto padrão
              id={issue.id} // nao preciso passar la no componente
              html_url={issue.html_url}
              created_at={issue.created_at}
            />
          ))}
      </IssuesListStyle>
    </HomeContainer>
  );
}
