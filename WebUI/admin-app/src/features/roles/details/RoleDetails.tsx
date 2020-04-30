import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { S } from '../../../styles';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Spin, Row, Col } from 'antd';
import NotFound from '../../../app/layout/NotFound';
import { RouteComponentProps } from 'react-router-dom';
import RoleEdit from '../edit/RoleEdit';
import RoleUsersList from '../users-list/RoleUsersList';

const RoleDetails: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadRole, role, loadingRoles } = rootStore.roleStore;

  useEffect(() => {
    loadRole(match.params.id);
  }, [loadRole, match]);

  if (loadingRoles) return <Spin></Spin>;

  if (!role) return <NotFound />;

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>{role.name}</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            <RoleUsersList />
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>
            <RoleEdit />
          </S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(RoleDetails);
