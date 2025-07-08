package ma.brainit.aman.administration.cron;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import net.javacrumbs.shedlock.core.SchedulerLock;

@Component
public class MyJobSchedule {
	
	static Logger logger = LoggerFactory.getLogger(MyJobSchedule.class);
	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss sss");
	
	@Scheduled(cron="*/20 * * * * *")
	@SchedulerLock(name = "TaskScheduler_processFiles", 
    	lockAtLeastForString = "PT1M", lockAtMostForString = "PT2M")
	public void processFiles() {
//		Date now = new Date();
//		String nowString = df.format(now); 
//		System.out.println(synchronisationService.synchronizeAll());
	}
	
}