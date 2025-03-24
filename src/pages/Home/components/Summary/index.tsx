import { useState, useEffect } from 'react';
import { SummaryAnchors, SummaryContainer, SummaryHeader } from './styles';
import { ArrowUpRight, Buildings, GithubLogo, Users } from 'phosphor-react';
import axios from 'axios';

type IProfile = {
  avatar_url: string;
  html_url: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  followers: number;
};

type IIssues = {
  html_url: string;
};

export function Summary() {
  // "https://api.github.com/users", "/lucaspedronet"
  // "https://api.github.com/search"
  // "https://api.github.com/repos/lucaspedronet/TudoLista/issues"

  const [profile, setProfile] = useState<IProfile>();
  const [issue, setIssue] = useState<IIssues[]>();
  const [loadingP, setLoadingP] = useState(true);

  async function fetchProfile() {
    await axios({
      method: 'get',
      url: 'https://api.github.com/users/darwin3333',
    }).then((response) => {
      setProfile(response.data);
      setLoadingP(false);

      //console.log(response.data);
    });
  }

  async function fetchIssues() {
    await axios({
      method: 'get',
      url: 'https://api.github.com/repos/lucaspedronet/TudoLista/issues',
    }).then((response) => {
      setIssue(response.data);
      console.log(response.data);
    });
  }

  useEffect(() => {
    fetchProfile();
    fetchIssues();
  }, []);

  return (
    <>
      {loadingP ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Carregando</h1>
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
    </>
  );
}
