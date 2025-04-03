import { useState, useEffect } from 'react';
import { SummaryAnchors, SummaryContainer, SummaryHeader } from './styles';
import { ArrowUpRight, Buildings, GithubLogo, Users } from 'phosphor-react';
import axios from 'axios';
import { defaultTheme } from '../../../../styles/themes/default';

type IProfile = {
  avatar_url: string;
  html_url: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  followers: number;
};

export function Summary() {
  // "https://api.github.com/users", "/lucaspedronet"
  // "https://api.github.com/search"
  // "https://api.github.com/repos/lucaspedronet/TudoLista/issues"

  const [profile, setProfile] = useState<IProfile>();

  const [loading, setLoading] = useState(true);
  const [errorP, setErrorP] = useState(false);

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

  useEffect(() => {
    fetchProfile();
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
    </>
  );
}
