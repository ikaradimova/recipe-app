package recipe.app.demo.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import recipe.app.demo.models.Role;
import recipe.app.demo.models.User;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class UserPrinciple implements UserDetails {

//    private static final long serialVersionUID = 1L;
    private User user;
//    private Collection<GrantedAuthority> authorities = new ArrayList<>();
    private Set<GrantedAuthority> authorities;

    public UserPrinciple(User user) {
        this.user = user;
        Role role = user.getRole();
        authorities = new HashSet<GrantedAuthority>();

        authorities.add(new SimpleGrantedAuthority(role.getName()));

        if (authorities.isEmpty()) {
            authorities.add(new SimpleGrantedAuthority("user"));
        }
//		insertRoles(roles);
//		final Role role = user.getRole();
//		if (null != role) {
//			authorities.add(new SimpleGrantedAuthority(role.getName()));
//		} else {
//			authorities.add(new SimpleGrantedAuthority("user"));
//		}
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
