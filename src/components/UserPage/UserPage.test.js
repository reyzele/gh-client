import React from 'react';
import { shallow } from 'enzyme';

import { UserPage } from './UserPage';

describe('Написать тесты для компоненты UserPage', () => {
    const wrapper = shallow(
      <UserPage userRequest={jest.fn()}
        isFetching={false}
        data={null}
        match={{params: {name: 'name'}}}
        location={{pathname: 'pathname'}}/>
    );

   it('Проверить наличие метода componentDidUpdate', () => {
      expect(wrapper.instance().componentDidUpdate).toBeDefined();
   });

   it('Проверить наличие спинера/лоадера если props.isFetching === true', () => {
      wrapper.setProps({isFetching: true});
      expect(wrapper.find('.Spinner')).toHaveLength(1);
   });

   it('Проверить наличие сообщения об отсутствии пользователя если isFetching === false && user == null', () => {
      wrapper.setProps({isFetching: false});
      expect(wrapper.find('.sc-notification.notification').text()).toEqual('This user does not exist.')
   });

   it('В основной верстке должен быть аватар пользователя', () => {
     wrapper.setProps({
        data: {
          login: "reyzele",
          avatar_url: "https://avatars3.githubusercontent.com/u/35307996?v=4",
          followers: 1,
          public_repos: 18
        }
    });

      expect(wrapper.find('img[src="https://avatars3.githubusercontent.com/u/35307996?v=4"]')).toBeTruthy();
   });

});