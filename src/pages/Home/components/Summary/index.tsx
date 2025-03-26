import { useState, useEffect } from 'react';
import { SummaryAnchors, SummaryContainer, SummaryHeader } from './styles';
import { ArrowUpRight, Buildings, GithubLogo, Users } from 'phosphor-react';
import axios from 'axios';
import { defaultTheme } from '../../../../styles/themes/default';
import { Issue } from '../Issue';

type IProfile = {
  avatar_url: string;
  html_url: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  followers: number;
};

export type IIssues = {
  id: number; //fica, todo componente precisa de uma key.
  title: string; //titulo da issue.
  body?: string; // alguns bodys estao vazios, preciso do '?'
  html_url: string; // vai ficar, vou usar para encaminhar para a pagina principal
  created_at: string; // data
  pull_request?: {}; //fica pois preciso para filtrar as tasks validas
  //author_association: string;  (nao necessito neste momento)
};

export function Summary() {
  // "https://api.github.com/users", "/lucaspedronet"
  // "https://api.github.com/search"
  // "https://api.github.com/repos/lucaspedronet/TudoLista/issues"

  const [profile, setProfile] = useState<IProfile>();
  const [issues, setIssues] = useState<IIssues[]>();
  const [loading, setLoading] = useState(true);
  const [errorP, setErrorP] = useState(false);
  const [errorI, setErrorI] = useState(false);

  async function fetchProfile() {
    try {
      const profileData = await axios.get(
        'https://api.github.com/users/lucaspedronet'
      );
      setProfile(profileData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorP(true);
      setLoading(false);
    }
  }
  //https://api.github.com/repos/lucaspedronet/BlogProfileGitHub/issues'
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
    fetchProfile();
    fetchIssues();
    console.log(issues);
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            color: defaultTheme['blue-400'],
          }}
        >
          <h3>Carregando</h3>
        </div>
      ) : errorP ? (
        <div
          style={{
            color: defaultTheme['blue-400'],
          }}
        >
          <h3>Erro na consulta.</h3>
        </div>
      ) : (
        <SummaryContainer>
          <img src={profile?.avatar_url} />
          <section>
            <SummaryHeader>
              <h1>{profile?.name} </h1>
              <a href={profile?.html_url} target="_blank">
                GITHUB
                <ArrowUpRight size={12} />
              </a>
            </SummaryHeader>
            <p>{profile?.bio}</p>
            <SummaryAnchors>
              <div>
                <GithubLogo size={18} />
                <span>{profile?.login}</span>
              </div>

              <div>
                <Buildings size={18} />
                <span>{profile?.location}</span>
              </div>

              <div>
                <Users size={18} />
                <span>{profile?.followers}</span>
              </div>
            </SummaryAnchors>
          </section>
        </SummaryContainer>
      )}
      {profile &&
        issues &&
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
    </>
  );
}
