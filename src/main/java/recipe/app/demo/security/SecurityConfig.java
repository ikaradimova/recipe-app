package recipe.app.demo.security;

import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

@EnableGlobalMethodSecurity(
		prePostEnabled = true,
		securedEnabled = true,
		jsr250Enabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	private ApplicationDetailsService _userDetailService;
	public SecurityConfig(ApplicationDetailsService userDetailsService) {
		// TODO Auto-generated constructor stub
		_userDetailService = userDetailsService;
	}

	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/**").permitAll()
				.requestMatchers(EndpointRequest.toAnyEndpoint())
				.permitAll()
				.and().csrf().disable();
		http.headers().frameOptions().disable();
//		http.authorizeRequests()
//				.anyRequest().fullyAuthenticated()
//				.and()
//				.formLogin().loginPage("/login")
//				.and().logout().permitAll();
//		http.headers().frameOptions().disable();


//		http.authorizeRequests().antMatchers("/**").permitAll()
//				.requestMatchers(EndpointRequest.toAnyEndpoint())
//				.authenticated()
//				.and().csrf().disable();
//		http.headers().frameOptions().disable();

//		http.antMatcher("/cuisine/**")
//				.authorizeRequests()
//				.antMatchers("/cuisine/add").hasRole("admin");

//		http
//			.csrf().disable()
//			.authorizeRequests().antMatchers("/login").permitAll()
//			.anyRequest().authenticated()
//			.and()
////			.formLogin()
////			.loginPage("/login").permitAll()
////			.and()
//			.logout().invalidateHttpSession(true)
//			.clearAuthentication(true)
////			.logoutRequestMatcher("/logout")
//			.logoutSuccessUrl("/profile").permitAll();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth)
			throws Exception {
		// TODO Auto-generated method stub
		super.configure(auth);
		auth.userDetailsService(_userDetailService);
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return _userDetailService;
	}

//	@Override
	public void addViewControllers(ViewControllerRegistry registry){
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/cuisine").setViewName("cuisine-add");
    }
}
