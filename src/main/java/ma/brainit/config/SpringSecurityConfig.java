package ma.brainit.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CharacterEncodingFilter;

import ma.brainit.aman.administration.service.CustomAuthenticationProvider;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired(required = true)
	private CustomAuthenticationProvider authenticationProvider;
	@Autowired
	private CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

	@Autowired
	DataSource dataSource;

	@Autowired
	public void configureGlobal(UserDetailsService userDetailsService, AuthenticationManagerBuilder auth)
			throws Exception {
		auth.authenticationProvider(authenticationProvider).eraseCredentials(false);
	}

	@Override
	public void configure(WebSecurity webSecurity) throws Exception
	{
		webSecurity
		.ignoring()
		.antMatchers("/resources/**");  
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		CharacterEncodingFilter filter = new CharacterEncodingFilter();
		filter.setEncoding("UTF-8");
		filter.setForceEncoding(true);
		http.addFilterBefore(filter, CsrfFilter.class);
		http.servletApi().rolePrefix("").and()
		.authorizeRequests()
		.antMatchers("/changepassword/**", "/login/**", "/inscription-externe", "/external-registration/**", "/external/**", "/administration/synchronisation/rest/synchronize/**", "/reminder/calendar/rest/getAppointments/**", "/client/courrier/rest/initiateWorkflowFacture/**", "/client/courrier/rest/getReference/**", "/courrier/sender/rest/getAll/**", "/courrier/sender/rest/getAllName/**", "/courrier/sender/rest/save", "/courrier/invoice/rest/getAllTask/**").permitAll()
		.antMatchers("/**").authenticated()
		.and().formLogin()
		.loginPage("/")
		.loginProcessingUrl("/login")
		.defaultSuccessUrl("/")
		.failureHandler(customAuthenticationFailureHandler)
		.permitAll()
		.and()
		.logout()
		.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
		.logoutSuccessUrl("/")
		.permitAll()
		.invalidateHttpSession(true)
		.and()
		.csrf().disable()
		//		        .exceptionHandling()
		//		            .accessDeniedHandler(accessDeniedExceptionHandler());
		.exceptionHandling().accessDeniedPage("/403");
	}

	public AccessDeniedHandler accessDeniedExceptionHandler() {
		throw new AccessDeniedException(null);
	}

	@Bean
	DefaultWebSecurityExpressionHandler webSecurityExpressionHandler() {
		DefaultWebSecurityExpressionHandler handler = new DefaultWebSecurityExpressionHandler();
		handler.setDefaultRolePrefix("");
		return handler;
	}

}