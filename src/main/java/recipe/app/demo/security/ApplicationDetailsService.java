package recipe.app.demo.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import recipe.app.demo.models.User;
import recipe.app.demo.repositories.UserRepository;

@Service
public class ApplicationDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public ApplicationDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly=true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

//        final User user = userRepository.findByUsername(username);
//        if (null == user) {
//            throw new UsernameNotFoundException("User with username=''" + username + "'' does not exist!");
//        }
//        return new UserPrinciple(user);
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new UsernameNotFoundException(username);

//        Role role = user.getRole();

        return new UserPrinciple(user);
    }

}
