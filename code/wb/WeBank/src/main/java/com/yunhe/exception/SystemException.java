package com.yunhe.exception;

public class SystemException extends RuntimeException {

	private static final long serialVersionUID = 6209082937647060098L;

	private String code;

	private Throwable e;

	public String getCode() {
	    return this.code;
    }

    public SystemException(String code, String msg) {
        super(msg);
        this.code = code;
    }

    public SystemException(String code, String msg, Throwable e) {
        super(msg);
        this.code = code;
        this.e = e;
    }

	public SystemException(String msg) {
        super(msg);
    }

    public SystemException(String msg, Throwable e) {
        super(msg);
        this.e = e;
    }
}