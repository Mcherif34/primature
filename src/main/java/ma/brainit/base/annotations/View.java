package ma.brainit.base.annotations;


@java.lang.annotation.Target(value={java.lang.annotation.ElementType.FIELD,java.lang.annotation.ElementType.METHOD})
@java.lang.annotation.Retention(value=java.lang.annotation.RetentionPolicy.RUNTIME)
public @interface View{
	String entity() default " ";
	String attribut() default " ";
	String className() default " ";
	String type() default " ";
	boolean grid() default false;
}