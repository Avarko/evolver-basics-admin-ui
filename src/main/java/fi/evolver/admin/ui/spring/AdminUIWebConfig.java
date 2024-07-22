package fi.evolver.admin.ui.spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class AdminUIWebConfig implements WebMvcConfigurer {
	private static final Logger LOG = LoggerFactory.getLogger(AdminUIWebConfig.class);

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/admin-ui/").setViewName("forward:/admin-ui/index.html");
		registry.addViewController("/admin-ui/{path:[^\\.]*}").setViewName("forward:/admin-ui/index.html");
	}
}
