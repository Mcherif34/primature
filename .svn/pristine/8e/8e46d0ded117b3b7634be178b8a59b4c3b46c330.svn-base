package ma.brainit.config;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.thymeleaf.dialect.IDialect;
import org.thymeleaf.extras.springsecurity4.dialect.SpringSecurityDialect;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

import nz.net.ultraq.thymeleaf.LayoutDialect;

@Configuration
@EnableWebMvc
@EnableAsync
@ComponentScan(basePackages = "ma.brainit.*")
public class SpringWebConfig extends WebMvcConfigurerAdapter {


	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/assets/").addResourceLocations("/resources/static/");
		registry.addResourceHandler("/assets/**").addResourceLocations("/resources/assets/");
		registry.addResourceHandler("/images/**").addResourceLocations("/resources/static/images/");
		registry.addResourceHandler("/favicon.ico").addResourceLocations("/resources/static/images/uir_favicon.ico"); //image apparu dans le déploiement
	}

	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setDefaultEncoding("UTF-8");
		messageSource.setBasenames(getResourceFolderFiles("i18n"));
		return messageSource;
	}

	private static String[] getResourceFolderFiles (String folder) {
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		URL url = loader.getResource(folder);
		String path ="";
		File file;
		try {
			file = new File(url.toURI());
			path = file.getPath();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		File[] files = new File(path).listFiles();
		String[] basenames = null;
		if(files != null){
			basenames = new String[files.length];
			for(int i=0;i<files.length;i++){
				basenames[i] = "classpath:i18n/"+StringUtils.remove(files[i].getName(), ".properties");
			}
		}
		return basenames;
	}



	@Bean
	public ServletContextTemplateResolver templateResolver() {
		ServletContextTemplateResolver resolver = new ServletContextTemplateResolver();
		resolver.setPrefix("/WEB-INF/views/");
		resolver.setSuffix(".html");
		resolver.setCharacterEncoding("UTF-8");
		resolver.setTemplateMode("HTML5");
		resolver.setCacheable(false);
		resolver.setOrder(1);
		return resolver;
	}

	@Bean
	public SpringTemplateEngine templateEngine() {
		SpringTemplateEngine engine = new SpringTemplateEngine();
		engine.setTemplateResolver(templateResolver());
		Set<IDialect> dialects = new HashSet<IDialect>();
		dialects.add(new LayoutDialect());
		dialects.add(new SpringSecurityDialect());
		engine.setAdditionalDialects(dialects);     
		return engine;
	}

	@Bean
	public ThymeleafViewResolver thymeleafViewResolver() {
		ThymeleafViewResolver resolver = new ThymeleafViewResolver();
		resolver.setTemplateEngine(templateEngine());
		resolver.setContentType("text/html; charset=UTF-8");
		resolver.setCharacterEncoding("UTF-8");
		return resolver;
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver createMultipartResolver() {
		CommonsMultipartResolver resolver=new CommonsMultipartResolver();
		resolver.setDefaultEncoding("utf-8");
		resolver.setMaxUploadSize(80000000);
		return resolver;
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}


}
