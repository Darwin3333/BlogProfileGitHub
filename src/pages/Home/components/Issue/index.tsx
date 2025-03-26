// import { dateFormatter } from "../../../../utils/formatter";
import { IIssues } from '../Summary';
import { IssuesContainer, StyledNavLink } from './styles';

export function Issue({ title, body, created_at }: IIssues) {
  return (
    <IssuesContainer>
      <StyledNavLink to="/issue">
        <div>
          <h2>{title}</h2>
          <span>{new Date(created_at).toLocaleString()}</span>{' '}
        </div>
        <div style={{ color: 'white', marginTop: '60px' }}>
          {' '}
          {body?.slice(0, 200)}
        </div>
      </StyledNavLink>
    </IssuesContainer>
  );
}
